#!/usr/bin/env node

import dotenv from 'dotenv';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildCommand } from './commands/build';
import { DeployCommand } from './commands/deploy';
import { DevCommand } from './commands/dev';
import { SyncCommand } from './commands/sync';

(async () => {
	const commands = [SyncCommand, DevCommand, BuildCommand, DeployCommand];

	const handler = yargs(hideBin(process.argv));

	commands.forEach((command) => {
		handler.command(command);
	});

	handler.demandCommand(1).parse();

	const globalOptions = await handler.options({
		envFile: {
			type: 'string',
			alias: 'e',
			description: 'Path to the .env file to use',
			default: path.join(process.cwd(), '.env'),
		},
	}).argv;

	dotenv.config({ path: globalOptions.envFile });
})();
