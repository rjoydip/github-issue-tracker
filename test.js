'use strict'

const t = require('tap')
const test = t.test
const Fastify = require('fastify')

test('should return an html document', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify.register(require('fastify-nextjs')).after(() => {
    fastify.next('/')
  })

  fastify.inject(
    {
      url: '/',
      method: 'GET'
    },
    (err, res) => {
      t.error(err)
      t.equal(res.statusCode, 200)
      t.equal(res.headers['content-type'], 'text/html; charset=utf-8')
    }
  )
  fastify.close()
})
