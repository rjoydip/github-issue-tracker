'use strict'

// core modules import
const { resolve } = require('path')
// 3rd party modules import
const dotenv = require('dotenv')
const Octokit = require('@octokit/rest')
// application modules import
const utils = require('./utils')

// registering plugins with `@octokit/rest` module
Octokit.plugin(
  require('@octokit/plugin-throttling'),
  require('@octokit/plugin-retry')
)
// extract configuration values from dotenv file
const config = dotenv.config({ path: resolve(process.cwd(), '.env') }).parsed
// octokit instance
const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_ACCESS_TOKEN ||
    config.GITHUB_ACCESS_TOKEN}`,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      if (!utils.isProd)
        octokit.log.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`
        )
      if (options.request.retryCount === 0) {
        // only retries once
        if (!utils.isProd)
          octokit.log.warn(`Retrying after ${retryAfter} seconds!`)
        return true
      }
    },
    onAbuseLimit: (_, options) => {
      // does not retry, only logs a warning
      if (!utils.isProd)
        octokit.log.warn(
          `Abuse detected for request ${options.method} ${options.url}`
        )
    }
  }
})

/**
 * Get Issues based on below condition
 * @summary
 * - Total number of open issues
 * - Number of open issues that were opened in the last 24 hours
 * - Number of open issues that were opened more than 7 days ago
 * - Number of open issues that were opened more than 24 hours ago but less than 7 days ago
 * @param {string} repoStr
 * @returns {object}
 */
const getIssues = async (repoStr = '') => {
  const repoStrArr = repoStr.split('/')
  const INVALID_REPO_MSG = 'Invalid github repository'
  if (utils.isEmpty(repoStr)) {
    return new Error(INVALID_REPO_MSG)
  } else if (!utils.isEmpty(repoStr) && !repoStrArr.length) {
    return new Error(INVALID_REPO_MSG)
  } else {
    const options = octokit.issues.listForRepo.endpoint.merge({
      owner: repoStrArr[0],
      repo: repoStrArr[1],
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    })
    try {
      const issuesList = await octokit.paginate(options)
      const totalIssues = issuesList.filter(issue =>
        utils.isUndefined(issue.pull_request)
      )
      const less24HrsIssues = totalIssues.filter(issue =>
        utils.isAfter(issue.created_at, utils.since24Hrs)
      ).length
      const less7DaysIssues = totalIssues.filter(issue =>
        utils.isAfter(issue.created_at, utils.since7Days)
      ).length
      return {
        totalIssues: totalIssues.length,
        less24Hrs: less24HrsIssues,
        less7Days: less7DaysIssues,
        more24HrsLess7Days: less7DaysIssues - less24HrsIssues
      }
    } catch (e) {
      return new Error(e)
    }
  }
}

exports = module.exports = {
  getIssues
}
