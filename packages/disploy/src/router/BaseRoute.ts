import type { InteractionType } from 'discord-api-types/v10';
import type { App } from '../client';

export class BaseRoute {
	/**
	 * The type of interaction this route is for.
	 */
	public type!: InteractionType;

	public constructor(protected app: App) {
		Object.defineProperty(this, 'app', { value: app });
	}
}
