import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const isEmpty = val => val === '';
export const config = key => (publicRuntimeConfig[key]);

export default ({
    isEmpty,
    config,
});