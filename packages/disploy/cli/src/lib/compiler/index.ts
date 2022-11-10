import { mkdir, rm, writeFile } from 'fs/promises';
import { InputPluginOption, Plugin, rollup } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import type { DisployConfig } from '../disployConf';
import { UserError } from '../UserError';
import { CompilerAssets } from './assets';
import { parseCommands } from './commands';
import { TempDir } from './constants';
import { copyDir } from './copyDir';

interface ParsedTarget {
	entry: string;
	jsVersion: string;
	type: DisployConfig['target']['type'];
	isNode: boolean;
}

function parseTarget(type: DisployConfig['target']['type']): ParsedTarget {
	switch (type) {
		case 'cloudflare':
			return {
				entry: 'cfWorkerEntry',
				jsVersion: 'es2020', // https://github.com/cloudflare/wrangler2/blob/b164e2d6faff3a9a18f447ff47fe98e8cee24c86/packages/wrangler/src/bundle.ts#L272
				isNode: false,
				type,
			};
		case 'standalone':
			return {
				entry: 'standaloneEntry',
				jsVersion: 'es2022',
				isNode: true,
				type,
			};
		case 'deno':
			return {
				entry: 'denoEntry',
				jsVersion: 'es2022',
				isNode: false,
				type,
			};
		default:
			throw new UserError(`Unknown target type: ${type}`);
	}
}

function generatePlugins(target: ParsedTarget) {
	const plugins: InputPluginOption[] = [];

	if (!target.isNode) {
		plugins.push(nodePolyfills() as Plugin);
	}

	plugins.push(
		esbuild({
			platform: 'neutral',
			treeShaking: true,
			target: target.jsVersion,
		}),
	);

	return plugins;
}

export async function Compile({
	root,
	target: targetConfig,
	entryFileName,
}: {
	root: string;
	target: DisployConfig['target']['type'];
	entryFileName: string;
}) {
	await rm(TempDir, { recursive: true, force: true });
	await mkdir(TempDir, { recursive: true });

	const workbenchDir = `${TempDir}/workbench`;

	await mkdir(workbenchDir, { recursive: true });
	copyDir(root, workbenchDir);

	await parseCommands(workbenchDir);
	const target = parseTarget(targetConfig);

	await writeFile(`${workbenchDir}/entry.js`, CompilerAssets[target.entry]());

	const bundle = await rollup({
		input: `${workbenchDir}/entry.js`,
		plugins: generatePlugins(target),
		external: ['@disploy/framework'],
	});

	await bundle.write({
		file: `${TempDir}/${entryFileName}`,
		format: 'es',
	});

	await rm(workbenchDir, { recursive: true, force: true });

	return `${TempDir}/${entryFileName}`;
}
