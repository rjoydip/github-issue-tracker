'use strict';

// 3rd party modules import
const fastify = require('fastify')();
const {
  Signale
} = require('signale');
// application modules import
const utils = require('./utils');
const tracker = require('./tracker');

/** 
 * signale instance
 * @description Colorfull and interactive consoler 
 */
const trackerSignale = new Signale({
  interactive: true,
  scope: 'tracker'
});

/**
 * Tracker handler
 * @param {*} request
 * @param {*} reply 
 * @callback trackerHandler
 * @param {Request} request
 * @param {Response} Response
 */
const trackerHandler = async (request, reply) => {
  const repoName = utils.getRepoName(request.body.url);
  try {
    trackerSignale.await(`[${repoName}] - Fetching result`);
    const result = await tracker.getIssues(repoName);
    trackerSignale.success(`[${repoName}] - Fetched successfully`);
    reply.status(200).send({
      result,
      message: 'Data fetched successfully'
    });
  } catch (error) {
    trackerSignale.error(`[${repoName}] - Oops! Got an error`);
    reply.status(403).send(error);
  }
};

/**
 * Registering fastyfy nextjs plugin
 * @note multiple fastify plugin can be registered by chaining.
 * @memberof fastify
 */
fastify
  .register(require('fastify-nextjs'), {
    dev: process.env.NODE_ENV || false
  })
  .after(() => {
    fastify.next('/', (app, req, reply) => {
      app.render(req.raw, reply.res, '/app', req.query, {});
    });
  });

/**
 * Registering tracker api route
 * @memberof fastify
 */
fastify.post('/api/tracker', {
  config: {},
}, trackerHandler);

/**
 * Run the server!
 * @description Spinup the server with async way
 */
(async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();