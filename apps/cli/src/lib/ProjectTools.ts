import { DisployConfig, readConfig } from "./disployConf";

let config: DisployConfig | undefined;

async function resolveProject({ cwd }: { cwd: string }) {
  if (!config) {
    const pkg = await readConfig(cwd);
    config = pkg;
  }

  return config;
}

export const ProjectTools = {
  resolveProject,
};
