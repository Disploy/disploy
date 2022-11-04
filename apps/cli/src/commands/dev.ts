import * as ngrok from "ngrok";
import { watch } from "node:fs";
import path from "node:path";
import ora from "ora";
import type { Argv, CommandModule } from "yargs";
import { createServer, setApp } from "../lib/devServer";
import { ProjectTools } from "../lib/ProjectTools";
import { logger } from "../utils/logger";
import { BuildApp } from "./common/build";

export const aliases: string[] = [];
export const desc: string = "Enter development mode";

export const builder = (yargs: Argv) => yargs.options({});

export const DevCommand: CommandModule = {
  aliases,
  builder,
  command: "dev",
  async handler() {
    const devServerPort = 5002;

    const { root } = await ProjectTools.resolveProject({
      cwd: process.cwd(),
    });

    const { clientId, publicKey, token } =
      await ProjectTools.resolveEnvironment({
        cwd: process.cwd(),
      });

    const watcher = watch(root, { recursive: true });
    let timeout: NodeJS.Timeout | null = null;

    const devAction = async () => {
      const spinner = ora("Found change! Building project").start();
      const entry = await BuildApp({ skipPrebuild: true });

      const app = await import(path.join(process.cwd(), entry));

      setApp(app.default, {
        clientId,
        publicKey,
        token,
      });

      spinner.succeed();
    };

    logger.warn(
      "If you're using a prebuild script, it will not be run on dev. (i.e if you're using typescript, you'll need to run tsc watch yourself!)"
    );
    devAction();

    watcher.on("change", () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        devAction();
      }, 1000);
    });

    createServer(devServerPort);

    const spinner = ora("Tunneling to ngrok").start();

    const url = await ngrok.connect({
      addr: devServerPort,
      proto: "http",
    });

    spinner.succeed();
    logger.info(
      `Visit https://discord.com/developers/applications/${clientId}/information and set "INTERACTIONS ENDPOINT URL" to ${url}/interactions`
    );
    ``;
  },
};
