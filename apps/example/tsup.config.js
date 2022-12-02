import { createTsupConfig } from '../../tsup.config.js';

export default createTsupConfig({
	entry: ['src/**/*.ts', '!src/**/*.d.ts', 'src/**/*.tsx'],
	format: ['esm'],
	tsconfig: 'src/tsconfig.json',
});
