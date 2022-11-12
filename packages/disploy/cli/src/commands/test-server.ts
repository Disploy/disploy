import { watch } from 'node:fs';
import path from 'node:path';
import ora from 'ora';
import type { Argv, CommandModule } from 'yargs';
import { createServer, setApp } from '../lib/devServer';
import { ProjectTools } from '../lib/ProjectTools';
import { logger } from '../utils/logger';
import { BuildApp } from './common/build';

export const aliases: string[] = [];
export const desc: string = 'Serve test-server';

export const builder = (yargs: Argv) => yargs.options({});

export const TestServerCommand: CommandModule = {
	aliases,
	builder,
	command: 'test-server',
	async handler() {
		const devServerPort = 5002;
		let ready = false;

		const { root } = await ProjectTools.resolveProject({
			cwd: process.cwd(),
		});

		const { clientId, publicKey, token } = await ProjectTools.resolveEnvironment({
			cwd: process.cwd(),
			requires: ['clientId', 'token'],
		});

		const watcher = watch(root, { recursive: true });
		let timeout: NodeJS.Timeout | null = null;

		const devAction = async () => {
			const spinner = ora('Found change! Building project').start();
			const entry = await BuildApp({
				skipPrebuild: true,
				overrideTarget: { type: 'standalone' },
				entryFileName: `entry-${Math.random().toString(36).substring(7)}.mjs`,
			});

			const app = await import(path.join(process.cwd(), entry));

			setApp(app.default, {
				clientId,
				publicKey,
				token,
			});

			if (!ready) {
				ready = true;
				logger.info(`Server Ready!`);
				logger.info(`URI: http://localhost:${devServerPort}/interactions`);
			}

			spinner.succeed();
		};

		logger.warn(
			[
				"If you're using a prebuild script, it will not be run!",
				"Disploy's development mode expects the root of your project to be ready to run JavaScript.",
				"For example, if you're using typescript, you should run `tsc -w` alongside disploy's dev command.",
			].join('\n'),
		);
		devAction();

		watcher.on('change', () => {
			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(() => {
				devAction();
			}, 1000);
		});

		createServer(devServerPort, true);
	},
};
