import { createTsupConfig } from '../../tsup.config.js';

export default [
	createTsupConfig({
		entry: ['src/index.ts'],
	}),
	createTsupConfig({
		entry: ['cli/src/disploy.ts'],
		format: ['esm'],
		outDir: 'dist/cli',
		dts: false,
	}),
];
