import * as yargs from "yargs";
import Init from "./commands/init";

const commands = [Init];

for (const command of commands) {
  yargs.command(command);
}

yargs.demandCommand().argv;
