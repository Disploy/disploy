import { readFile } from "node:fs/promises";
import path from "node:path";
import type { DisployPkg } from "../types/DisployPkg";

async function loadPackage(file: string) {
  const pkg = await readFile(file, "utf-8");
  return JSON.parse(pkg) as DisployPkg;
}

async function resolveProject({ cwd }: { cwd: string }) {
  let res: {
    main: string;
    prebuild: string | null;
  } = {
    main: "",
    prebuild: null,
  };

  const pkg = await loadPackage(`${cwd}/package.json`);
  if (!pkg["disploy:main"]) throw new Error("No main entrypoint found");

  res.main = path.join(cwd, pkg["disploy:main"]);
  res.prebuild = pkg["disploy:prebuild"] || null;

  return res;
}

export const ProjectTools = {
  resolveProject,
  loadPackage,
};
