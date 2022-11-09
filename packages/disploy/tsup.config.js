import { createTsupConfig } from '../../tsup.config.js';

export default createTsupConfig({
	entry: ['src/index.ts', 'cli/src/disploy.ts'],
});
