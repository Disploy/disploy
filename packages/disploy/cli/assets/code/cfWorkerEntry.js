import { App } from 'disploy';
import { Commands } from './Commands';
import { Handlers } from './Handlers';

function createCloudflareAdapter(app) {
	return async function (req, randId) {
		if (req.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}
		let reqHeaders = {};
		for (const [key, value] of req.headers) {
			reqHeaders[key] = value;
		}
		const tReq = {
			body: await req.json(),
			headers: reqHeaders,
			_request: req,
			randId,
		};
		const payload = await app.router.entry(tReq);
		const { status, headers, body } = payload.serialized;
		return new Response(JSON.stringify(body), {
			status,
			headers: (() => {
				const headersObj = {
					'content-type': 'application/json',
				};
				for (const [key, value] of Object.entries(headers)) {
					if (typeof value === 'string') {
						headersObj[key] = value;
					}
					if (Array.isArray(value)) {
						headersObj[key] = value.join(',');
					}
				}
				return headersObj;
			})(),
		});
	};
}

export default {
	async fetch(request, env, ctx) {
		const app = new App({ commands: Commands, handlers: Handlers, env });
		app.start({
			publicKey: env.PUBLIC_KEY,
			clientId: env.CLIENT_ID,
			token: env.TOKEN,
		});
		const randId = Math.random().toString(36).substring(7);
		ctx.waitUntil(
			new Promise((resolve) => {
				app.router.on(`finish-${randId}`, () => {
					resolve();
				});
			}),
		);
		return await createCloudflareAdapter(app)(request, randId);
	},
};
