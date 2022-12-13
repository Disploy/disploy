import bodyParser from 'body-parser';
import type { App, TRequest } from 'disploy';
import express from 'express';
import type { DisployStandaloneBundle } from '../../types';
import { logger } from '../../utils/logger';

let app: App | null = null;
const remoteCommands: string[] = [];

const server = express();
server.use(bodyParser.json());

server.post('/interactions', async (req, res) => {
	if (!app) {
		return void res.status(500).send('App not ready');
	}

	const tReq: TRequest = {
		body: req.body,
		headers: req.headers,
		_request: req,
	};

	const payload = await app.router.entry(tReq);
	const { status, headers, body } = payload.serialized;

	return void res.status(status).set(headers).send(body);
});

export function createServer(port: number) {
	server.listen(port);
}

export async function setApp(
	newApp: DisployStandaloneBundle,
	options: { clientId: string; publicKey: string | null; token: string },
	skipSync = false,
) {
	const firstTime = !app;

	app = newApp.app;
	app.start({
		clientId: options.clientId,
		publicKey: options.publicKey,
		token: options.token,
		commands: newApp.commands,
		env: process.env as Record<string, string>, // TZ could be undefined
	});

	if (skipSync) return;

	if (firstTime) {
		remoteCommands.push(...(await app.commands.getRegisteredCommands()).map((c) => c.name));
	}

	let needsSync = false;

	for (const command of newApp.commands) {
		if (!remoteCommands.includes(command.name)) {
			needsSync = true;
			break;
		}
	}

	if (needsSync) {
		logger.info('Syncing commands...');
		await app.commands.syncCommands();
	}
}
