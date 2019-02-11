const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')

const plugin = [
  withCSS()
]

const isProduction = process.env.NODE_ENV === 'production'

module.exports = withPlugins([
  ...plugin
], {
  name: 'github-issue-tracker',
  alise: 'github-issue-tracker',
  serverRuntimeConfig: {
    env: { }
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
    isProduction,
    APP_NAME: 'Github Issue Tracker'
  }
})
