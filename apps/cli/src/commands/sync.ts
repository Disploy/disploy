import inquirer from 'inquirer';
import path from 'node:path';
import ora from 'ora';
import type { Argv, CommandModule } from 'yargs';
import { ProjectTools } from '../lib/ProjectTools';
import type { DisployStandaloneBundle } from '../types';
import { BuildApp } from './common/build';

export const aliases: string[] = [];
export const desc: string = 'Deploy a project';

export const builder = (yargs: Argv) => yargs.options({});

export const SyncCommand: CommandModule = {
	aliases,
	builder,
	command: 'sync',
	async handler() {
		const { clientId, publicKey, token } = await ProjectTools.resolveEnvironment({
			cwd: process.cwd(),
		});

		const input = await inquirer.prompt([
			{
				type: 'list',
				name: 'syncStrategy',
				message: 'What sync strategy would you like to use?',
				choices: [
					{
						name: 'Replace all existing commands',
						value: 'replace',
					},
					{
						name: 'Merge with existing commands',
						value: 'merge',
					},
				],
			},
		]);

		const entry = await BuildApp({
			skipPrebuild: true,
			overrideTarget: 'standalone',
			entryFileName: `entry.mjs`,
		});

		const { app, commands }: DisployStandaloneBundle = (await import(path.join(process.cwd(), entry))).default;

		app.start({
			clientId: clientId,
			publicKey: publicKey,
			token: token,
			commands,
		});

		const spinner = ora(`Syncing ${commands.length} commands`).start();

		await app.commands.syncCommands(input.syncStrategy === 'replace' ? false : true);

		spinner.succeed();
	},
};
