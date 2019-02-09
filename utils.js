'use strict';

// 3rd party modules import
const dayjs = require("dayjs");

const isEmpty = val => val === '';
const isUndefined = val => val === undefined;
const isProd = process.env.NODE_ENV === 'production';

/**
 * Extract Reponame
 * @description Extract repository name from github link and
 * also validating where link is valid or not
 * @param {string} url 
 * @example https://github.com/nodejs/node > nodejs/node
 * @returns {string}
 */
const getRepoName = (url = '') => {
    const regex = /^(http|https):\/\/github.com/;
    const isValidGithubURL = regex.test(url);
    if (isValidGithubURL) {
        const urlSplit = url.split('/').filter(n => n);
        let repoNameStr = urlSplit.slice(2).join('/');
        const regex = /(.-+#$)git/g;
        if (repoNameStr.match(regex)) {
            // only elemenating .git from a the url
            repoNameStr = repoNameStr.replace(regex, '');
        }
        
        return repoNameStr;
    }
    return '';
}

exports = module.exports = {
    isUndefined,
    isProd,
    isEmpty,
    getRepoName,
    since24Hrs: dayjs().subtract(1, "day").toISOString(),
    since7Days: dayjs().subtract(7, "day").toISOString(),
    isAfter: (str1, str2) => dayjs(str1).isAfter(dayjs(str2)),
    isBefore: (str1, str2) => dayjs(str1).isBefore(dayjs(str2)),
}