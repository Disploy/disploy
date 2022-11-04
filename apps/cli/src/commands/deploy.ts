import type { Argv, CommandModule } from 'yargs';
import { UserError } from '../lib/UserError';

export const aliases: string[] = [];
export const desc: string = 'Deploy a project';

export const builder = (yargs: Argv) => yargs.options({});

export const DeployCommand: CommandModule = {
	aliases,
	builder,
	command: 'deploy',
	async handler() {
		throw new UserError('Not implemented');
	},
};
