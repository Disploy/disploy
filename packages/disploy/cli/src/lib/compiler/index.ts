import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'node:path';
import { rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import { logger } from '../../utils/logger';
import type { DisployConfig } from '../disployConf';
import { UserError } from '../UserError';
import { CompilerAssets } from './assets';
import { TempDir } from './constants';
import { copyDir } from './copyDir';
import { globExportBundle } from './globExportBundle';

function parseTarget(target: DisployConfig['target']) {
	switch (target.type) {
		case 'cloudflare':
			return 'cfWorkerEntry';
		case 'standalone':
			return 'standaloneEntry';
		case 'devServer':
			return 'devServerEntry';
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
	// Remove the temp folder if it exists
	await rm(TempDir, { recursive: true, force: true });
	// Create the temp folder
	await mkdir(TempDir, { recursive: true });

	// Create a workbench folder inside the temp folder
	const workbenchDir = path.join(TempDir, 'workbench');
	await mkdir(workbenchDir, { recursive: true });

	// Copy the workbench folder to the temp folder
	copyDir(root, workbenchDir);

	// Bundle commands
	await globExportBundle(workbenchDir, {
		pathFromWorkbench: 'commands',
		name: 'Commands',
	});

	// Bundle message component handlers
	await globExportBundle(workbenchDir, {
		pathFromWorkbench: 'handlers',
		name: 'Handlers',
	});

	// Parse the target
	const entry = parseTarget(target);
	// Get the entry file name
	const input = path.join(workbenchDir, 'entry.js');
	// Write the entry file
	await writeFile(input, CompilerAssets[entry]());

	// Create a rollup bundle
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

	// Get the output file name
	const output = path.join(TempDir, entryFileName);
	// Write the output file
	await bundle.write({
		file: output,
		format: 'es',
	});

	// Remove the workbench folder
	await rm(workbenchDir, { recursive: true, force: true });

	// Return the output file name
	return output;
}
