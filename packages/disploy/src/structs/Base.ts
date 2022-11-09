import type { App } from '../client';

export class Base {
	public app!: App;

	public constructor(app: App) {
		this.app = app;
	}
}
