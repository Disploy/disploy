import { spawn } from "node:child_process";
import type { Argv, CommandModule } from "yargs";
import { Compile } from "../lib/compiler";
import { ProjectTools } from "../lib/ProjectTools";
import { logger } from "../utils/logger";

export const aliases: string[] = [];
export const desc: string = "Deploy a project";

export const builder = (yargs: Argv) => yargs.options({});

export const DeployCommand: CommandModule = {
  aliases,
  builder,
  command: "deploy",
  async handler() {
    logger.info("Deploying...");

    const { root, prebuild, target } = await ProjectTools.resolveProject({
      cwd: process.cwd(),
    });

    if (prebuild) {
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
    await Compile({ root, target });
  },
};
