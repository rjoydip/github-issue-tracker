'use strict';

const {
  resolve
} = require("path");
const fastify = require('fastify')();
const dotenv = require("dotenv");
const Octokit = require("@octokit/rest")
  .plugin(
    require("@octokit/plugin-throttling"),
    require("@octokit/plugin-retry")
  );

const utils = require('./utils');

// extract configuration values from dotenv file
const config = dotenv.config({
  path: resolve(process.cwd(), '.env')
}).parsed;

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_ACCESS_TOKEN || config.GITHUB_ACCESS_TOKEN}`,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      if (!utils.isProd) octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);

      if (options.request.retryCount === 0) {
        // only retries once
        if (!utils.isProd) octokit.log.warn(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      if (!utils.isProd) octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
    }
  }
});

const trackerHandler = async (request, reply) => {
  const repoName = utils.getRepoName(request.body.url);
  console.log(repoName);
  const options = octokit.issues.listForRepo.endpoint.merge({
    owner: "webpack",
    repo: "webpack",
    headers: {
      Accept: "application/vnd.github.v3+json"
    }
  });

  try {
    const issuesList = octokit.paginate(options);
    const totalIssues = issuesList.filter(issue => isUndefined(issue.pull_request));

    const less24HrsIssues = totalIssues.filter(issue =>
      dayjs(issue.created_at).isAfter(dayjs(utils.since24Hrs))
    );

    const less7DaysIssues = totalIssues.filter(issue =>
      dayjs(issue.created_at).isAfter(dayjs(utils.since7Days))
    );

    const more24HrsLess7DaysIssues = totalIssues.filter(
      issue =>
      dayjs(issue.created_at).isAfter(dayjs(utils.since7Days)) &&
      dayjs(issue.created_at).isBefore(dayjs(utils.since24Hrs))
    );

    reply.status(200).send({
      less24Hrs: less24HrsIssues,
      less7Days: less7DaysIssues,
      more24HrsLess7Days: more24HrsLess7DaysIssues,
    });
  } catch (error) {
    reply.status(403).send(error);
  }
};

fastify
  .register(require('fastify-nextjs'), {
    dev: process.env.NODE_ENV || false
  })
  .after(() => {
    fastify.next('/', (app, req, reply) => {
      app.render(req.raw, reply.res, '/app', req.query, {});
    });
  });

// register routes
fastify.post('/api/tracker', {
  config: {
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
}, trackerHandler);

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();