import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const config = key => (publicRuntimeConfig[key]);