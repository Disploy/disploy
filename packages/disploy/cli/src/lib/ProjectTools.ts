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

export type EnvironmentKey = 'token' | 'publicKey' | 'clientId';

async function resolveEnvironment() {
	const { DISCORD_TOKEN: token, DISCORD_PUBLIC_KEY: publicKey, DISCORD_CLIENT_ID: clientId } = process.env;

	if (!token || !publicKey || !clientId) {
		throw new UserError(
			`Missing ${!token ? 'DISCORD_TOKEN' : ''} ${!publicKey ? 'DISCORD_PUBLIC_KEY' : ''} ${
				!clientId ? 'DISCORD_CLIENT_ID' : ''
			} environment variables`,
		);
	}

	return {
		token,
		publicKey,
		clientId,
	};
}

export const ProjectTools = {
	resolveProject,
	resolveEnvironment,
};
