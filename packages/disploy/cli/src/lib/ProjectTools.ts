import { DisployConfig, readConfig } from './disployConf';
import { batchGetEnvVars } from './EnvTools';
let config: DisployConfig | undefined;

async function resolveProject({ cwd }: { cwd: string }) {
	if (!config) {
		const pkg = await readConfig(cwd);
		config = pkg;
	}

	return config;
}

async function resolveEnvironment(publicKeyRequired = true): Promise<{
	token: string;
	publicKey: string | null;
	clientId: string;
}> {
	const { DISCORD_TOKEN, DISCORD_PUBLIC_KEY, DISCORD_CLIENT_ID } = await batchGetEnvVars([
		{
			key: 'DISCORD_TOKEN',
		},
		{
			key: 'DISCORD_PUBLIC_KEY',
			required: publicKeyRequired,
		},
		{
			key: 'DISCORD_CLIENT_ID',
		},
	]);

	return {
		token: DISCORD_TOKEN!,
		publicKey: DISCORD_PUBLIC_KEY,
		clientId: DISCORD_CLIENT_ID!,
	};
}

export const ProjectTools = {
	resolveProject,
	resolveEnvironment,
};
