import EventEmitter from 'eventemitter3';
import { DefaultRestConfig } from './Constants';
import type { RestEvents } from './types';

/**
 * Required Configuration for the REST client.
 */
export interface RequiredRestConfig {
	token: string;
}

/**
 * Optional Configuration for the REST client.
 */
export interface OptionalRestConfig {
	apiRoot: string;
	cacheMatchers: RegExp[];
}

export class Rest extends EventEmitter<RestEvents> {
	private options: RequiredRestConfig & OptionalRestConfig;
	private cache: Map<string, unknown> = new Map();

	public constructor(config: RequiredRestConfig & Partial<OptionalRestConfig>) {
		super();

		this.options = {
			...DefaultRestConfig,
			...config,
		};
	}

	private debug(msg: string) {
		this.emit('debug', msg);
	}

	private async _request<T>(method: string, path: string, body?: any): Promise<T> {
		const now = Date.now();

		const res = await fetch(`${this.options.apiRoot}${path}`, {
			method,
			headers: {
				Authorization: `Bot ${this.options.token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		this.debug(`[REST] ${method} ${path} (${res.status}) ${Date.now() - now}ms`);

		if (res.status >= 400) {
			throw new Error(`${method} ${path} returned ${res.status} ${res.statusText}`);
		}

		const contentType = res.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			return res.json();
		}

		return res.arrayBuffer() as unknown as T;
	}

	private async request<T>(...args: Parameters<Rest['_request']>): Promise<T> {
		const key = args.join(' ');

		if (this.options.cacheMatchers.some((matcher) => matcher.test(args[1]))) {
			if (this.cache.has(key)) {
				return this.cache.get(key) as T;
			}

			const res = await this._request<T>(...args);
			this.cache.set(key, res);
			return res;
		}

		return this._request<T>(...args);
	}

	public async get<RES>(path: string): Promise<RES> {
		return this.request('GET', path);
	}

	public async post<REQ, RES>(path: string, body?: REQ): Promise<RES> {
		return this.request('POST', path, body);
	}

	public async patch<REQ, RES>(path: string, body?: REQ): Promise<RES> {
		return this.request('PATCH', path, body);
	}

	public async delete<RES>(path: string): Promise<RES> {
		return this.request('DELETE', path);
	}

	public async put<REQ, RES>(path: string, body?: REQ): Promise<RES> {
		return this.request('PUT', path, body);
	}
}
