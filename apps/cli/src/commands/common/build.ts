import { spawn } from 'child_process';
import * as color from 'colorette';
import ora from 'ora';
import { Compile } from '../../lib/compiler';
import type { DisployConfig } from '../../lib/disployConf';
import { ProjectTools } from '../../lib/ProjectTools';
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
		await new Promise<void>((resolve, reject) => {
			spawn(prebuild.split(' ')[0]!, prebuild.split(' ').slice(1), {
				cwd: process.cwd(),
				stdio: 'ignore',
			}).on('exit', (code) => {
				if (code === 0) {
					resolve();
				} else {
					reject();
				}
			});
		});
		spinner.succeed();
	}

	spinner = ora(
		['Bundling project', `${color.gray('Target:')} ${color.magenta(overrideTarget || target)}`].join('\n'),
	).start();
	const res = await Compile({ root, target: overrideTarget || target, entryFileName });
	spinner.succeed();
	return res;
}
