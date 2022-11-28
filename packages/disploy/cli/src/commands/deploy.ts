import * as color from 'colorette';
import ora from 'ora';
import type { Argv, CommandModule } from 'yargs';
import { ProjectTools } from '../lib/ProjectTools';
import { UserError } from '../lib/UserError';
import { WranglerWrapper } from '../lib/WranglerWrapper';
import { logger } from '../utils/logger';
import { BuildApp } from './common/build';

export const aliases: string[] = [];
export const desc: string = 'Build a project';

export const builder = (yargs: Argv) =>
	yargs.options('skip-prebuild', {
		type: 'boolean',
		alias: 'sp',
		description: 'Skip the prebuild script',
		default: false,
	});

export const DeployCommand: CommandModule<{}, { 'skip-prebuild': boolean }> = {
	aliases,
	builder,
	command: 'deploy',
	async handler(opts) {
		const conf = await ProjectTools.resolveProject({
			cwd: process.cwd(),
		});
		const entry = await BuildApp({
			skipPrebuild: opts.skipPrebuild,
		});

		switch (conf.target.type) {
			case 'cloudflare': {
				const wrangler = new WranglerWrapper(conf, entry);

				const spinner = ora('Deploying to Cloudflare Workers').start();

				await wrangler.publish();

				spinner.succeed('Deployed to Cloudflare Workers');

				logger.info(
					[
						"You should visit the Cloudflare Workers dashboard to add your environment variables if you haven't already.",
						`${color.gray('CLIENT_ID')} Your Discord application's client ID`,
						`${color.gray('PUBLIC_KEY')} Your Discord application's public key`,
						`${color.gray('TOKEN')} Your Discord application's bot token`,
					].join('\n'),
				);
				break;
			}

			default: {
				throw new UserError(`Unsupported deploy target type: ${conf.target.type}`);
			}
		}
	},
};
