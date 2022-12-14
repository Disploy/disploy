import chokidar from 'chokidar';
import * as color from 'colorette';
import { resolve } from 'import-meta-resolve';
import * as ngrok from 'ngrok';
import path from 'node:path';
import ora from 'ora';
import type { Argv, CommandModule } from 'yargs';
import { createServer, setApp } from '../lib/devServer';
import { ProjectTools } from '../lib/ProjectTools';
import { runShellCommand } from '../lib/shell';
import { F } from '../lib/StringFormatters';
import { logger } from '../utils/logger';
import { BuildApp } from './common/build';

export const aliases: string[] = [];
export const desc: string = 'Enter development mode';

export const builder = (yargs: Argv) =>
	yargs.options({
		'ignore-watcher-output': {
			desc: 'Ignores the watchers output (tsc)',
			alias: 'iwo',
			default: false,
			type: 'boolean',
		},
		tunnel: {
			desc: 'Uses ngrok to tunnel the dev server',
			alias: 't',
			default: true,
			type: 'boolean',
		},
	});

export const DevCommand: CommandModule<{}, { 'ignore-watcher-output': boolean; tunnel: boolean }> = {
	aliases,
	builder,
	command: 'dev',
	async handler(opts) {
		const devServerPort = 5002;

		const {
			root,
			prebuild,
			watcher: devScript,
		} = await ProjectTools.resolveProject({
			cwd: process.cwd(),
		});

		if (prebuild) {
			await runShellCommand(prebuild);
		}

		if (devScript) {
			runShellCommand(devScript, opts.ignoreWatcherOutput ? 'ignore' : 'inherit');
		}

		const { clientId, publicKey, token } = await ProjectTools.resolveEnvironment();

		const watcher = chokidar.watch(root);
		let timeout: NodeJS.Timeout | null = null;

		const devAction = async () => {
			const spinner = ora('Found change! Building project').start();

			try {
				const entry = await BuildApp({
					skipPrebuild: true,
					overrideTarget: { type: 'devServer' },
					entryFileName: `entry-${Math.random().toString(36).substring(7)}.mjs`,
				});

				const app = await import(await resolve(path.join(process.cwd(), entry), import.meta.url));

				setApp(app.default, {
					clientId,
					publicKey,
					token,
				});

				spinner.succeed();
			} catch (e) {
				spinner.fail(String(e));
			}
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

		createServer(devServerPort);

		let url = `http://localhost:${devServerPort}`;

		if (opts.tunnel) {
			const spinner = ora('Tunneling to ngrok').start();

			const tunnelUrl = await ngrok.connect({
				addr: devServerPort,
				proto: 'http',
			});

			url = tunnelUrl;

			spinner.succeed('Connected to ngrok');
		}

		logger.info(
			[
				'Your bot is ready to receive interactions!',
				`1. Visit ${color.cyan(F.createAppSettingsURL(clientId))}`,
				`2. Set ${color.gray('INTERACTIONS ENDPOINT URL')} to ${color.cyan(F.createInteractionsURI(url))}`,
			].join('\n'),
		);
		``;
	},
};
