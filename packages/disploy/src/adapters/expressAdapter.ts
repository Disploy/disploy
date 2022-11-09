import type * as Express from 'express';
import type { TRequest } from '../http';
import type { IAdapter } from './IAdapter';

export const expressAdapter: IAdapter<Express.Application> = (app, server) => {
	server.post('/interactions', async (req, res) => {
		const tReq: TRequest = {
			body: req.body,
			headers: req.headers,
			_request: req,
		};

		const payload = await app.router.entry(tReq);
		const { status, headers, body } = payload.serialized;

		res.status(status).set(headers).send(body);
	});
};
