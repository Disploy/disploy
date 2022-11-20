import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getEnv = (name) => {
	const value = process.env[name];
	if (value === '' || value === undefined) {
		return undefined;
	}
	return value;
};

const parsePullRequestId = (githubRef) => {
	const result = /refs\/pull\/(\d+)\/merge/g.exec(githubRef);
	if (!result) throw new Error('Reference not found.');
	const [, pullRequestId] = result;
	return pullRequestId;
};

const Environment = {
	DISCORD_TOKEN: getEnv('DISCORD_TOKEN') ?? '_token_',
	DISCORD_CLIENT_ID: getEnv('DISCORD_CLIENT_ID') ?? '0',
	GITHUB_TOKEN: getEnv('GITHUB_TOKEN'),
	GITHUB_REF: getEnv('GITHUB_REF'),
};

const server = spawn('yarn', ['workspace', '@disploy/example', 'test-server'], {
	env: {
		...process.env,
		...Environment,
	},
});

server.on('error', (error) => {
	console.error(error);
	process.exit(1);
});

server.stdout.on('data', (data) => {
	if (data.includes('Server Ready!')) {
		const args = ['disbench', 'internal', 'benchmark', '-d', '-u', 'http://localhost:5002/interactions'];

		if (Environment.GITHUB_REF) {
			args.push('-g');
			args.push(`Disploy/disploy#${parsePullRequestId(Environment.GITHUB_REF)}`);
		}

		const benchmark = spawn('yarn', args, {
			cwd: join(__dirname, '..', 'apps', 'example'),
			stdio: 'inherit',
		});

		benchmark.on('exit', () => {
			server.kill();
			process.exit(0);
		});
	}
});
