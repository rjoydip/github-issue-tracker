# github-issue-tracker

A github issue tracker SSR (next + fastify) application.

## Installation

```bash
$ git clone https://github.com/rjoydip/github-issue-tracker.git
$ cd github-issue-tracker
$ npm i # or yarn
$ npm run dev # or yarn dev - Run the development server
```

## Scripts

- **build**: Next.js build
- **build:prod**: Next.js production build (`recomended`)
- **dev**: Running fastify development server.
- **serve**: Build next.js app with production and running fastify server in product mode.
- **test**: Test case of the server + frontend. Code standardisation. *`Rigth now this is :x:`*

## Features

- SSR with next.js
- React hooks.
- [`@octokit/rest`](https://github.com/octokit/rest.js#readme) used for GitHub REST API call.
- `octokit plugins`
    - [`plugin-retry`](https://github.com/octokit/plugin-retry.js#readme) It retries request for server 4xx/5xx responses.
    - [plugin-throttling](https://github.com/octokit/plugin-throttling.js#readme) Used for the purpose of [Best practices for integrators](https://developer.github.com/v3/guides/best-practices-for-integrators/)
- [`fastify-nextjs`](https://github.com/fastify/fastify-nextjs#readme) plugin for next.js (SSR) with Fastify.
- [`dayjs`](https://github.com/iamkun/dayjs#readme) Fast 2kB alternative to Moment.js with the same modern API

## Improvement needs

- UI/UX
- PWA support.
- Enable [`dynamic`](https://nextjs.org/docs/#dynamic-import) import support.
- Next.js SSR caching (`lru-cache`). [Example](https://github.com/zeit/next.js/blob/canary/examples/ssr-caching/server.js#L11)
- Validation not working
    * :thought_balloon: This is the issue of [form-hooks](https://github.com/BenMagyar/form-hooks). I will take a look in future. Right now I will ticket an issue after making a example. Later on I will think about the PR if needs.
- Testing and standardise code quality ([`standard`](https://www.npmjs.com/package/standard)). [`working`]
- Github rest API taking too much time to paginate and response back.
    * :thought_balloon: Cache the results with [`Redis`](https://redis.io/) or if found any other faster caching module.
    * :thought_balloon: Thinking better to use [`GraphQL`](https://developer.github.com/v4/).
    * :thought_balloon: Try with the `Autopaginate` options. [Issue](https://github.com/octokit/rest.js/issues/688)
- Validate request data and response output with fastify.
- Better to host in `AWS`.
- CLI application needs. Right not tracker are in seperate file.
- Replace `tap` testing modules with `Jest + React testing library`.

## Why these modules has been used?

- [Fastify](https://www.fastify.io/) 
    - It's faster and low overhead framework. 
    - Fastify plugin system are good.
    - Core teams members and contributors are active.
    - Ecosystem/Plugins are good.
- [Next.js](https://nextjs.org/docs)
    - SSR support and lot's are good things are.
    - Active ecosystem.
    - New react features supported here.
    - Good plugins supports.
- [octokit]
    - Calling Github API easyly.
    - Good plugins supports.
- [dayjs](https://github.com/iamkun/dayjs#readme)
    - Lightwaight
    - Modern API
    - It's a good alternative of [`Moment.js`](https://momentjs.com/)
- [React](https://reactjs.org/)
    - Lot's of advantages
- [Jest + React testing library]
    - Why not `enzyme`?
    > https://github.com/unlock-protocol/unlock/issues/467#issuecomment-435398658

## License

MIT © [Joydip Roy](https://github.com/rjoydip/github-issue-tracker/blob/master/LICENSE)