#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildCommand } from './commands/build';
import { DeployCommand } from './commands/deploy';
import { DevCommand } from './commands/dev';
import { NewCommand } from './commands/new';
import { SyncCommand } from './commands/sync';

const commands = [SyncCommand, DevCommand, BuildCommand, DeployCommand, NewCommand];

const handler = yargs(hideBin(process.argv));

commands.forEach((command) => {
	handler.command(command);
});

handler.demandCommand(1).parse();
