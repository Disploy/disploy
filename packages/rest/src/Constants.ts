import type { OptionalRestConfig } from './Rest';

export const DefaultRestConfig: Required<OptionalRestConfig> = {
	apiRoot: 'https://discord.com/api/v10',
	cacheMatchers: [/^\/gateway\/bot$/],
};
