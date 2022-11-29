import type { Logger } from '../utils';

export interface RestConfig {
	token: string;
	apiRoot?: string;
	logger?: Logger;
}

export class Rest {
	private _token!: string;
	private _apiRoot: string = 'https://discord.com/api/v10';
	private logger: Logger | undefined;

	public constructor(config: RestConfig) {
		this._token = config.token;
		this._apiRoot = config.apiRoot || this._apiRoot;
		this.logger = config.logger;
	}

	private async _request<T>(method: string, path: string, body?: any): Promise<T> {
		const now = Date.now();

		const res = await fetch(`${this._apiRoot}${path}`, {
			method,
			headers: {
				Authorization: `Bot ${this._token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		this.logger?.debug(`[REST] ${method} ${path} (${res.status}) ${Date.now() - now}ms`);

		if (res.status >= 400) {
			throw new Error(`${method} ${path} returned ${res.status} ${res.statusText}`);
		}

		const contentType = res.headers.get('content-type');

		if (contentType && contentType.includes('application/json')) {
			return res.json();
		}

		return res.text() as any;
	}

	public async get<RES>(path: string): Promise<RES> {
		return this._request('GET', path);
	}

	public async post<REQ, RES>(path: string, body?: REQ): Promise<RES> {
		return this._request('POST', path, body);
	}

	public async patch<REQ, RES>(path: string, body?: REQ): Promise<RES> {
		return this._request('PATCH', path, body);
	}

	public async delete<RES>(path: string): Promise<RES> {
		return this._request('DELETE', path);
	}

	public async put<REQ, RES>(path: string, body?: REQ): Promise<RES> {
		return this._request('PUT', path, body);
	}
}
