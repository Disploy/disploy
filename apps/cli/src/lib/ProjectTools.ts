import { readConfig } from "./disployConf";

async function resolveProject({ cwd }: { cwd: string }) {
  const pkg = await readConfig(cwd);

  return pkg;
}

export const ProjectTools = {
  resolveProject,
};
