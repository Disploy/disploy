import { spawn } from 'node:child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { copyAssets, startWatching } from './copyAssets.mjs';

async function run(script) {
	const [command, ...args] = script.split(' ');
	return new Promise((resolve, reject) => {
		spawn(command, args, { stdio: 'inherit' }).on('exit', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
}

yargs(hideBin(process.argv))
	.command(
		'build',
		'🏗️ Architect',
		() => {},
		async (argv) => {
			const { watch } = argv;

			copyAssets();
			watch && startWatching();

			try {
				await run(`yarn tsup${watch ? ' --watch' : ''}`);
			} catch (e) {
				process.exit(1);
			}
		},
	)
	.options('watch', {
		alias: 'w',
		type: 'boolean',
		description: '🔎 Watch for changes',
	})
	.demandCommand(1)
	.parse();
