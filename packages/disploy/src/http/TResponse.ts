export class TResponse {
	public serialized!: {
		body: any;
		headers: Record<string, string>;
		status: number;
	};

	public constructor() {
		this.serialized = {
			body: null,
			headers: {},
			status: 200,
		};
	}

	public json(body: any) {
		this.serialized.body = body;
		return this;
	}

	public status(status: number) {
		this.serialized.status = status;
		return this;
	}

	public setHeader(key: string, value: string) {
		this.serialized.headers[key] = value;
		return this;
	}
}
