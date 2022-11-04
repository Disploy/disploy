import dotenv from "dotenv";
import * as fs from "node:fs/promises";
import { DisployConfig, readConfig } from "./disployConf";
let config: DisployConfig | undefined;

async function resolveProject({ cwd }: { cwd: string }) {
  if (!config) {
    const pkg = await readConfig(cwd);
    config = pkg;
  }

  return config;
}

async function findClosestEnv() {
  let cwd = process.cwd();

  while (cwd !== "/") {
    const envPath = `${cwd}/.env`;
    try {
      await fs.access(envPath);
      return envPath;
    } catch (e) {
      cwd = cwd.substring(0, cwd.lastIndexOf("/"));
    }
  }

  return undefined;
}

async function resolveEnvironment({ cwd }: { cwd: string }) {
  dotenv.config({ path: await findClosestEnv() });

  const {
    DISCORD_TOKEN: token,
    DISCORD_PUBLIC_KEY: publicKey,
    DISCORD_CLIENT_ID: clientId,
  } = process.env;

  if (!token || !publicKey || !clientId) {
    throw new Error("Missing environment variables");
  }

  return {
    token,
    publicKey,
    clientId,
  };
}

export const ProjectTools = {
  resolveProject,
  resolveEnvironment,
};
