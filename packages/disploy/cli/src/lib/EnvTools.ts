import { UserError } from './UserError';

export class EnvGetError extends Error {
	constructor(public key: string) {
		super(`Environment variable ${key} is not set`);
		this.name = 'EnvGetError';
	}
}

export async function getEnvVar(key: string, required = true) {
	const value = process.env[key];
	if (!value && required) {
		throw new EnvGetError(key);
	}
	return value || null;
}

// TODO: type arguments instead of returning String | null
export async function batchGetEnvVars(
	keys: {
		key: string;
		required?: boolean;
	}[],
): Promise<Record<string, string | null>> {
	const errors: EnvGetError[] = [];
	const values = await Promise.all(
		keys.map(async ({ key, required = true }) => {
			try {
				return await getEnvVar(key, required);
			} catch (err: any) {
				if (typeof err === 'object' && err['name'] === 'EnvGetError') {
					errors.push(err as EnvGetError);
				}
			}
		}),
	);
	if (errors.length) {
		throw new UserError(`The following environment variables are not set: ${errors.map((err) => err.key).join(', ')}`);
	}

	return keys.reduce((acc, { key }, i) => {
		acc[key] = values[i] || null;
		return acc;
	}, {} as Record<string, string | null>);
}
