import { execSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const Packages = ['packages/disploy', 'packages/create-disploy-app'];
const ShortGitHash = execSync('git rev-parse --short HEAD').toString().trim();

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

const build = () => run('yarn build');

async function publishPackage(path, versionOverride, tag) {
	const { version } = JSON.parse(readFileSync(`${path}/package.json`));

	await run(
		`yarn publish ${path} --no-git-tag-version --new-version ${versionOverride || version} ${
			tag ? `--tag ${tag}` : ''
		}`,
	);
}

const publishDevPackage = (path) => publishPackage(path, `0.0.0-${ShortGitHash}`, 'dev');

yargs(hideBin(process.argv))
	.command(
		'publish',
		'🪄 Publish packages',
		() => {},
		async (argv) => {
			const { dev } = argv;

			await build();

			if (dev) {
				await Promise.all(Packages.map(publishDevPackage));
				return;
			}

			await Promise.all(Packages.map(publishPackage));
		},
	)
	.options('dev', {
		alias: 'd',
		type: 'boolean',
		description: '🔎 Publish dev packages',
	})
	.demandCommand(1)
	.parse();
