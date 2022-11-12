#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildCommand } from './commands/build';
import { DeployCommand } from './commands/deploy';
import { DevCommand } from './commands/dev';
import { SyncCommand } from './commands/sync';
import { TestServerCommand } from './commands/test-server';

const commands = [SyncCommand, DevCommand, BuildCommand, DeployCommand, TestServerCommand];

const handler = yargs(hideBin(process.argv));

commands.forEach((command) => {
	handler.command(command);
});

handler.demandCommand(1).parse();
