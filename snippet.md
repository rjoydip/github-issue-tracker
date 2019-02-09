```js
const dayjs = require("dayjs");
const Octokit = require("@octokit/rest").plugin(
  require("@octokit/plugin-throttling"),
  require("@octokit/plugin-retry")
);
const octokit = new Octokit({
  auth: "token e6e65f036f46c11c712d8a01544015e5aef20f7a",
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 0) {
        // only retries once
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    }
  }
});

const isUndefined = val => val === undefined;
const since24Hrs = dayjs()
  .subtract(1, "day")
  .toISOString();
const since7Days = dayjs()
  .subtract(7, "day")
  .toISOString();

console.log(since24Hrs, since7Days);

const options = octokit.issues.listForRepo.endpoint.merge({
  owner: "webpack",
  repo: "webpack",
  headers: {
    Accept: "application/vnd.github.v3+json"
  }
});

octokit
  .paginate(options)
  .then(issues => {
    const totalIssues = issues.filter(issue => isUndefined(issue.pull_request));
    console.log("Total issue", totalIssues.length);
    const less24H = totalIssues.filter(issue =>
      dayjs(issue.created_at).isAfter(dayjs(since24Hrs))
    );
    console.log("Total less24H", less24H.length);
    const less7D = totalIssues.filter(issue =>
      dayjs(issue.created_at).isAfter(dayjs(since7Days))
    );
    console.log("Total less7D", less7D.length);
    const more24HLess7D = totalIssues.filter(
      issue =>
        dayjs(issue.created_at).isAfter(dayjs(since7Days)) &&
        dayjs(issue.created_at).isBefore(dayjs(since24Hrs))
    );
    console.log("Total more24HLess7D", more24HLess7D.length);
  })
  .catch(e => console.error(e));
```
