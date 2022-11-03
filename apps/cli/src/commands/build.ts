import type { Argv, CommandModule } from "yargs";
import { BuildApp } from "./common/build";

export const aliases: string[] = [];
export const desc: string = "Build a project";

export const builder = (yargs: Argv) => yargs.options({});

export const BuildCommand: CommandModule = {
  aliases,
  builder,
  command: "build",
  async handler() {
    BuildApp();
  },
};
