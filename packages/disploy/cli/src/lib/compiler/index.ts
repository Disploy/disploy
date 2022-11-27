import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'node:path';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { logger } from '../../utils/logger';
import type { DisployConfig } from '../disployConf';
import { UserError } from '../UserError';
import { CompilerAssets } from './assets';
import { parseCommands } from './commands';
import { TempDir } from './constants';
import { copyDir } from './copyDir';
import { parseHandlers } from './handlers';

function parseTarget(target: DisployConfig['target']) {
	switch (target.type) {
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

	const workbenchDir = path.join(TempDir, 'workbench');

	await mkdir(workbenchDir, { recursive: true });
	copyDir(root, workbenchDir);

	await parseCommands(workbenchDir);
	await parseHandlers(workbenchDir);
	const entry = parseTarget(target);
	const input = path.join(workbenchDir, 'entry.js');

	await writeFile(input, CompilerAssets[entry]());

	const bundle = await rollup({
		input: input,
		plugins: [
			// @ts-ignore - Plugin types mismatch

			esbuild({
				platform: 'neutral',
				treeShaking: true,
			}),
		],
		external: ['disploy'],
		onwarn: (warning) => {
			if (warning.code === 'UNRESOLVED_IMPORT') return;
			logger.warn(warning.message);
		},
	});

	const output = path.join(TempDir, entryFileName);

	await bundle.write({
		file: output,
		format: 'es',
	});

	await rm(workbenchDir, { recursive: true, force: true });

	return output;
}
