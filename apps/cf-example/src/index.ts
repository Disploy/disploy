import { ExampleApp } from '@disploy/example';
import { createCloudflareAdapter } from './lib/cloudflareAdapter';

/* eslint-disable import/no-anonymous-default-export */
export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;

	CLIENT_ID: string;
	DISCORD_PUBLIC_KEY: string;
	DISCORD_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const app = new ExampleApp({
			clientID: env.CLIENT_ID,
			publicKey: env.DISCORD_PUBLIC_KEY,
			token: env.DISCORD_TOKEN,
		});
		return await createCloudflareAdapter(app)(request);
	},
};
