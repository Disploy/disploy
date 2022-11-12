import dotenv from 'dotenv';
import * as fs from 'node:fs/promises';
import { DisployConfig, readConfig } from './disployConf';
import { UserError } from './UserError';
let config: DisployConfig | undefined;

async function resolveProject({ cwd }: { cwd: string }) {
	if (!config) {
		const pkg = await readConfig(cwd);
		config = pkg;
	}

	return config;
}

async function findClosestEnv(opts: { cwd: string }) {
	let cwd = opts.cwd;

	while (cwd !== '/') {
		const envPath = `${cwd}/.env`;
		try {
			await fs.access(envPath);
			return envPath;
		} catch (e) {
			cwd = cwd.substring(0, cwd.lastIndexOf('/'));
		}
	}

	return undefined;
}

export type EnvironmentKey = 'token' | 'publicKey' | 'clientId';

async function resolveEnvironment({ cwd, requires }: { cwd: string; requires?: EnvironmentKey[] }) {
	dotenv.config({ path: await findClosestEnv({ cwd }) });

	const { DISCORD_TOKEN: token, DISCORD_PUBLIC_KEY: publicKey, DISCORD_CLIENT_ID: clientId } = process.env;
	const env = { token, publicKey, clientId };

	let missing: string[] = [];

	if (requires) {
		missing = requires.filter((key) => !env[key]);
	} else {
		missing = Object.keys(env).filter((key) => !env[key as EnvironmentKey]);
	}

	if (missing.length) {
		throw new UserError(
			`Missing environment variables: ${missing.join(
				', ',
			)}. Please add them to your .env file or set them in your environment.`,
		);
	}

	for (const key of Object.keys(env) as EnvironmentKey[]) {
		if (!env[key]) {
			env[key] = Math.random().toString(36).substring(7);
		}
	}

	return env as { token: string; publicKey: string; clientId: string };
}

export const ProjectTools = {
	resolveProject,
	resolveEnvironment,
};
