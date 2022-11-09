#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildCommand } from './commands/build';
import { DeployCommand } from './commands/deploy';
import { DevCommand } from './commands/dev';
import { SyncCommand } from './commands/sync';

const commands = [SyncCommand, DevCommand, BuildCommand, DeployCommand];

const handler = yargs(hideBin(process.argv));

commands.forEach((command) => {
	handler.command(command);
});

handler.demandCommand(1).parse();
