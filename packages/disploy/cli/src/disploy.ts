#!/usr/bin/env node --no-warnings

import dotenv from 'dotenv';
import path from 'node:path';
import yargs, { CommandModule } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildCommand } from './commands/build';
import { DeployCommand } from './commands/deploy';
import { DevCommand } from './commands/dev';
import { SyncCommand } from './commands/sync';
import { TestServerCommand } from './commands/test-server';

const cleanExit = function () {
	process.exit();
};
process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);

(async () => {
	const commands = [SyncCommand, DevCommand, BuildCommand, DeployCommand, TestServerCommand];

	const handler = yargs(hideBin(process.argv));

	const globalOptions = await handler.options({
		envFile: {
			type: 'string',
			alias: 'e',
			description: 'Path to the .env file to use',
			default: path.join(process.cwd(), '.env'),
		},
	}).argv;

	dotenv.config({ path: globalOptions.envFile });

	commands.forEach((command) => {
		handler.command(command as CommandModule);
	});

	handler.demandCommand(1).parse();
})();
