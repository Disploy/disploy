import { spawn } from "child_process";
import ora from "ora";
import { Compile } from "../../lib/compiler";
import { ProjectTools } from "../../lib/ProjectTools";

export async function BuildApp({ skipPrebuild = false } = {}) {
  let spinner = ora("Resolving project").start();

  const { root, prebuild, target } = await ProjectTools.resolveProject({
    cwd: process.cwd(),
  });

  spinner.succeed();

  if (prebuild && !skipPrebuild) {
    spinner = ora("Running prebuild script").start();
    await new Promise<void>((resolve, reject) => {
      spawn(prebuild.split(" ")[0]!, prebuild.split(" ").slice(1), {
        cwd: process.cwd(),
        stdio: "ignore",
      }).on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
    spinner.succeed();
  }

  spinner = ora("Bundling project").start();
  const res = await Compile({ root, target });
  spinner.succeed();
  return res;
}
