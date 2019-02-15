# github-issue-tracker

[![Build Status](https://travis-ci.org/rjoydip/github-issue-tracker.svg?branch=master)](https://travis-ci.org/rjoydip/github-issue-tracker)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


A github issue tracker SSR (next + fastify) application.

## Installation

```bash
$ git clone https://github.com/rjoydip/github-issue-tracker.git
$ cd github-issue-tracker
$ npm install # or yarn
$ npm run dev # or yarn dev
# Note: nodemon and next webpack server both can't work together
# that's why if anything modify in server side you have to
# re-run the application again
```

## Next steps

Remove the github access token value from `.env`. To get new access token folow the link [creating-a-personal-access-token-for-the-command-lin](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) or check out my [express-fastify-github-oauth](https://express-fastify-github-oauth.glitch.me/).

## Demo 

- **Glitch hosted** > [github-issue-tracker](https://rjoydip-github-issue-tracker.glitch.me/)

## Scripts

- **build**: Next.js build
- **build:prod**: Next.js production build (`recomended`)
- **dev**: Running fastify development server.
- **lint**: Lint check server and react code.
- **lint:fix**: Automatic lint issues fix (*Better than to check every file manually*).
- **serve**: Build next.js app with production and running fastify server in product mode.
- **test**: Test case of the server + frontend. Code standardisation. *`Rigth now this is`* :x:

## Features

- Server is asynchronus nature.
- SSR with next.js
- React hooks implementd.
- JSDoc style code commented [JSDoc](http://usejsdoc.org/index.html)
- [`@octokit/rest`](https://github.com/octokit/rest.js#readme) used for GitHub REST API call.
- `octokit plugins`
    - [`plugin-retry`](https://github.com/octokit/plugin-retry.js#readme) It retries request for server 4xx/5xx responses.
    - [plugin-throttling](https://github.com/octokit/plugin-throttling.js#readme) Used for the purpose of [Best practices for integrators](https://developer.github.com/v3/guides/best-practices-for-integrators/)
- [`fastify-nextjs`](https://github.com/fastify/fastify-nextjs#readme) plugin for next.js (SSR) with Fastify.
- [`dayjs`](https://github.com/iamkun/dayjs#readme) Fast 2kB alternative to Moment.js with the same modern API
- Code quality ([`eslint`](https://eslint.org/))
- Code format [Prettier](https://prettier.io/)

## Improvement needs

- PWA support.
- Benchmarking using [`autocannon`](https://www.npmjs.com/package/autocannon) and diagnoses performance issues using [`node-clinic`](https://clinicjs.org/)
- Enable [`dynamic`](https://nextjs.org/docs/#dynamic-import) import support for lazyly load component.
- Next.js SSR caching (`lru-cache`). [See more](https://github.com/zeit/next.js/blob/canary/examples/ssr-caching)
- Validation not working
    * This is the issue of [form-hooks](https://github.com/BenMagyar/form-hooks). I will take a look in future. Right now I will ticket an issue after making a example. Later on I will think about the PR if needs.
- Test server and client code.
- Github rest API taking too much time to paginate and response back.
    * Cache the results with [`Redis`](https://redis.io/) or if found any other faster caching module.
- Validate request data and response output with fastify.
- Replace `tap` testing modules with `Jest + React testing library`.

## Why these modules has been used?

- [Fastify](https://www.fastify.io/) 
    - It's faster :dash: and low overhead framework. 
    - Fastify plugin system are good.
    - Core teams members and contributors are active.
    - Ecosystem/Plugins are good.
- [Next.js](https://nextjs.org/docs)
    - SSR support and lot's of usefull feature are there.
    - Active ecosystem.
    - New react features supported here.
    - Good plugins supports.
- [octokit](#)
    - Calling Github API easyly.
    - Good plugins supports.
- [dayjs](https://github.com/iamkun/dayjs#readme)
    - Lightwaight
    - Modern API
    - It's a good alternative of [`Moment.js`](https://momentjs.com/)
- [React](https://reactjs.org/)
    - Lot's of advantages
- [Eslint](https://eslint.org)
    - Maintaining code quality
- [Prettier](https://prettier.io/)
    - Code format
- [Jest](https://jestjs.io/) - Not used yet
- [React testing library](https://testing-library.com/react) - Not used yet

## FAQ

- Why `Glitch`?

It's is fully docker container based. For each application I get a fresh linux environment. Intregrated terminal where I could run my usefull linux command. By default git and npm installed. Inline editor and file explorar tree. `Glitch` is faster.

- Why not `enzyme`?
    > https://github.com/unlock-protocol/unlock/issues/467#issuecomment-435398658

## License

MIT © [Joydip Roy](https://github.com/rjoydip/github-issue-tracker/blob/master/LICENSE)