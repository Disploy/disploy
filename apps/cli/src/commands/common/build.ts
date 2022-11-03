import { spawn } from "child_process";
import { Compile } from "../../lib/compiler";
import { ProjectTools } from "../../lib/ProjectTools";
import { logger } from "../../utils/logger";

export async function BuildApp({ skipPrebuild = false } = {}) {
  const { root, prebuild, target } = await ProjectTools.resolveProject({
    cwd: process.cwd(),
  });

  if (prebuild && !skipPrebuild) {
    logger.info("Running prebuild script...");
    await new Promise<void>((resolve, reject) => {
      spawn(prebuild.split(" ")[0]!, prebuild.split(" ").slice(1), {
        cwd: process.cwd(),
        stdio: "inherit",
      }).on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  logger.info("Compiling...");
  return await Compile({ root, target });
}
