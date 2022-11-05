import { mkdir, rm, writeFile } from 'fs/promises';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import type { DisployConfig } from '../disployConf';
import { UserError } from '../UserError';
import { CompilerAssets } from './assets';
import { parseCommands } from './commands';
import { TempDir } from './constants';
import { copyDir } from './copyDir';

function parseTarget(target: DisployConfig['target']) {
	switch (target) {
		case 'cloudflare':
			return 'cfWorkerEntry';
		case 'standalone':
			return 'standaloneEntry';
		default:
			throw new UserError(`Unknown target: ${target}`);
	}
}

export async function Compile({
	root,
	target,
	entryFileName,
}: {
	root: string;
	target: DisployConfig['target'];
	entryFileName: string;
}) {
	await rm(TempDir, { recursive: true, force: true });
	await mkdir(TempDir, { recursive: true });

	const workbenchDir = `${TempDir}/workbench`;

	await mkdir(workbenchDir, { recursive: true });
	copyDir(root, workbenchDir);

	await parseCommands(workbenchDir);
	const entry = parseTarget(target);

	await writeFile(`${workbenchDir}/entry.js`, CompilerAssets[entry]());

	const bundle = await rollup({
		input: `${workbenchDir}/entry.js`,
		plugins: [
			// @ts-ignore - Plugin types mismatch

			esbuild({
				platform: 'neutral',
				treeShaking: true,
			}),
		],
		external: ['@disploy/framework'],
	});

	await bundle.write({
		file: `${TempDir}/${entryFileName}`,
		format: 'es',
	});

	await rm(workbenchDir, { recursive: true, force: true });

	return `${TempDir}/${entryFileName}`;
}
