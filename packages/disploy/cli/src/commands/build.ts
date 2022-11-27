import type { Argv, CommandModule } from 'yargs';
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

export const BuildCommand: CommandModule<{}, { 'skip-prebuild': boolean }> = {
	aliases,
	builder,
	command: 'build',
	async handler(opts) {
		await BuildApp({
			skipPrebuild: opts.skipPrebuild,
		});
	},
};
