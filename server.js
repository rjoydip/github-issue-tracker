'use strict'

// core modules
const { join } = require('path')
// 3rd party modules import
const fastify = require('fastify')()
// application modules import
const utils = require('./utils')
const tracker = require('./tracker')

/**
 * Attaching middleware
 * @todo
 * @memberof fastify
 */

/**
 * Registering fastify nextjs plugin
 * @description multiple fastify plugin can be registered here by chaining.
 * @memberof fastify
 */
fastify
  .register(require('fastify-static'), {
    root: join(__dirname, 'static'),
    prefix: '/' // optional: default '/'
  })
  .register(require('fastify-nextjs'), {
    dev: process.env.NODE_ENV || false
  })
  .after(() => {
    fastify.next('/', (app, req, reply) => {
      app.render(req.raw, reply.res, '/app', req.query, {})
    })
  })

/**
 * Tracker handler
 * @param {*} request
 * @param {*} reply
 * @callback trackerHandler
 * @param {Request} request
 * @param {Response} Response
 */
const trackerHandler = async (request, reply) => {
  const repoName = utils.getRepoName(request.body.url)
  if (utils.isEmpty(repoName)) {
    reply.status(500).send(new Error('Please enter a valid github repo url'))
  } else {
    try {
      const result = await tracker.getIssues(repoName)
      reply.status(200).send({
        result,
        message: 'Data fetched successfully'
      })
    } catch (error) {
      reply.status(500).send(error)
    }
  }
}

/**
 * Registering tracker api route
 * @memberof fastify
 * @todo Add request and response validate {@link https://www.fastify.io/docs/latest/Validation-and-Serialization/}
 */
fastify.post(
  '/api/tracker',
  {
    schema: {}
  },
  trackerHandler
)

/**
 * Run the server!
 * @description Spinup the server with async way
 */
const start = async () => {
  const PORT = process.env.PORT || 3000
  try {
    // waithing for fastify app ready stage before start the server
    await fastify.ready()
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
