import { readFile } from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { UserError } from '../UserError';

const disployConfigSchema = z.object({
	prebuild: z.string().optional(),
	watcher: z.string().optional(),
	root: z.string(),
	target: z.union([
		z.object({
			type: z.literal('cloudflare'),
			name: z.string(),
		}),
		z.object({
			type: z.literal('standalone'),
		}),
	]),
});

export type DisployConfig = z.infer<typeof disployConfigSchema>;

export async function readConfig(cwd: string): Promise<DisployConfig> {
	try {
		const file = await readFile(path.join(cwd, 'disploy.json'), 'utf-8');
		const config = await disployConfigSchema.parseAsync(JSON.parse(file));
		return config;
	} catch (e: any) {
		switch (e.code) {
			case 'ENOENT':
				throw new UserError('disploy.json not found');
			default:
				throw new UserError(e.message);
		}
	}
}
