import * as color from 'colorette';
import ora from 'ora';
import { Compile } from '../../lib/compiler';
import type { DisployConfig } from '../../lib/disployConf';
import { ProjectTools } from '../../lib/ProjectTools';
import { runShellCommand } from '../../lib/shell';
import { UserError } from '../../lib/UserError';

export async function BuildApp({
	skipPrebuild = false,
	overrideTarget,
	entryFileName = 'entry.mjs',
}:
	| {
			skipPrebuild?: boolean;
			overrideTarget?: DisployConfig['target'];
			entryFileName?: string;
	  }
	| undefined = {}) {
	let spinner = ora('Resolving project').start();

	const { root, prebuild, target } = await ProjectTools.resolveProject({
		cwd: process.cwd(),
	});

	spinner.succeed();

	if (prebuild && !skipPrebuild) {
		spinner = ora('Running prebuild script').start();
		try {
			await runShellCommand(prebuild);
		} catch {
			spinner.fail();
			throw new UserError('Prebuild script failed');
		}
		spinner.succeed();
	}

	spinner = ora(
		['Bundling project', `${color.gray('Target:')} ${color.magenta(overrideTarget?.type || target.type)}`].join('\n'),
	).start();
	const res = await Compile({ root, target: overrideTarget || target, entryFileName });
	spinner.succeed();
	return res;
}
