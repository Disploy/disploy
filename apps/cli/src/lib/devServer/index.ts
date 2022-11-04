import type { App, Command, TRequest } from '@disploy/framework';
import bodyParser from 'body-parser';
import express from 'express';

let app: App | null = null;

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

export function setApp(newApp: [App, Command[]], options: { clientId: string; publicKey: string; token: string }) {
	app = newApp[0];
	app.start({
		clientId: options.clientId,
		publicKey: options.publicKey,
		token: options.token,
		commands: newApp[1],
	});
}
