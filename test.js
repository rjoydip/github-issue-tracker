'use strict'

const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const { join } = require('path')
const { readFileSync } = require('fs')

test('should return an html document', t => {
  t.plan(3)

  const fastify = Fastify()
  fastify
    .register(require('./index'))
    .after(() => {
      fastify.next('/hello')
    })

  fastify.inject({
    url: '/hello',
    method: 'GET'
  }, (err, res) => {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.equal(res.headers['content-type'], 'text/html; charset=utf-8')
  })

  fastify.close()
});