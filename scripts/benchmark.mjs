import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getEnv = (name) => {
	const value = process.env[name];
	if (value === '' || value === undefined) {
		return null;
	}
	return value;
};

const Environment = {
	DISCORD_TOKEN: getEnv('DISCORD_TOKEN') ?? '_token_',
	DISCORD_CLIENT_ID: getEnv('DISCORD_CLIENT_ID') ?? '0',
};

const server = spawn('yarn', ['workspace', '@disploy/example', 'test-server'], {
	env: {
		...process.env,
		...Environment,
	},
	stdio: 'inherit',
});

// server.on('error', (error) => {
// 	console.error(error);
// 	process.exit(1);
// });

// server.stdout.on('data', (data) => {
// 	console.log(`server: ${data}`);
// 	if (data.includes('Server Ready!')) {
// 		const benchmark = spawn('yarn', ['disbench', 'internal', 'benchmark', '-u', 'http://localhost:5002/interactions'], {
// 			cwd: join(__dirname, '..', 'apps', 'example'),
// 			stdio: 'inherit',
// 		});

// 		benchmark.on('close', () => {
// 			server.kill();
// 		});
// 	}
// });
