#!/usr/bin/env node

import * as yargs from "yargs";
import { DeployCommand } from "./commands/deploy";
import { InitCommand } from "./commands/init";

const commands = [DeployCommand, InitCommand];

for (const command of commands) {
  yargs.command(command);
}

yargs.demandCommand().argv;
