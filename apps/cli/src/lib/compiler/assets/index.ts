import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface CodeGenAssets {
	[key: string]: (matchers?: Record<string, string>) => string;
}

const cache = new Map<string, string>();

export const CompilerAssets = new Proxy(
	{},
	{
		get: (_, name) => {
			const code =
				cache.get(name as string) ?? readFileSync(join(__dirname, 'assets', 'code', `${String(name)}.js`), 'utf-8');

			return createReplacer(code);
		},
	},
) as CodeGenAssets;

function createReplacer(code: string) {
	return function replacer(matchers?: Record<string, string>): string {
		if (!matchers) {
			return code;
		}

		let result = code;

		for (const key in matchers) {
			result = result.replace(new RegExp(`{{${key}}}`, 'g'), matchers[key]);
		}

		return result;
	};
}
