'use strict'

const fastify = require('fastify')();

fastify
  .register(require('fastify-nextjs'), {
    dev: process.env.NODE_ENV || false
  })
  .after(() => {
    fastify.next('/', (app, req, reply) => {
      app.render(req.raw, reply.res, '/main', req.query, {});
    });
  });

// register routes
fastify.route({
  method: 'GET',
  url: '/tracker',
  schema: {
    querystring: {},
    response: {
      200: {
        type: 'object',
        properties: {
          total_opened_issues: {
            type: 'number'
          }
        }
      }
    }
  },
  handler: (request, reply) => {
    reply.send({
      total_opened_issues: 132
    });
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();