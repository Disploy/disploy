import type { App } from '../client';

export class Verify {
	public constructor(public app: App) {}

	async verify(
		// @ts-expect-error Not used var
		body: string,
		// @ts-expect-error Not used var
		signature: string,
		// @ts-expect-error Not used var
		timestamp: string,
	): Promise<boolean> {
		throw new Error('Not implemented');
	}
}
