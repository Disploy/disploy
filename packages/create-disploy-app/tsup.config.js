import { createTsupConfig } from '../../tsup.config.js';

export default createTsupConfig({
	dts: false,
	format: ['esm'],
});
