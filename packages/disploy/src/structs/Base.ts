import type { App } from '../client';

export class Base {
	public app!: App;
	public raw: unknown
	public constructor(app: App, raw: unknown) {
		this.app = app;
		this.raw = raw
	}
}
