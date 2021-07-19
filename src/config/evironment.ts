import envs from "./envs";
export const currentEnvName = process.env.REACT_APP_STAGE || "development";
export const currentEnv = envs[currentEnvName];
