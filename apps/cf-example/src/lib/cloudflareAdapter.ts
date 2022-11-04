import type { App, TRequest } from '@disploy/framework';

export function createCloudflareAdapter(app: App) {
	return async function (req: Request) {
		if (req.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}

		let reqHeaders: TRequest['headers'] = {};

		for (const [key, value] of req.headers) {
			reqHeaders[key] = value;
		}

		const tReq: TRequest = {
			body: await req.json(),
			headers: reqHeaders,
			_request: req,
		};

		const payload = await app.router.entry(tReq);
		const { status, headers, body } = payload.serialized;

		return new Response(JSON.stringify(body), {
			status,
			headers: (() => {
				const headersObj: Record<string, string> = {
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
