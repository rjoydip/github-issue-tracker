'use strict';

const dayjs = require("dayjs");

const isUndefined = val => val === undefined;
const isProd = process.env.NODE_ENV === 'production';

const getRepoName = (url) => {
    const regex = /^(http|https):\/\/github.com/;
    const isValidGithubURL = regex.test(url);
    if (isValidGithubURL) {
        const urlSplit = url.split('/').filter(n => n);
        return urlSplit.slice(2).join('/')
    }
    return '';
}

exports = module.exports = {
    isUndefined,
    isProd,
    getRepoName,
    since24Hrs: dayjs().subtract(1, "day").toISOString(),
    since7Days: dayjs().subtract(7, "day").toISOString(),
}