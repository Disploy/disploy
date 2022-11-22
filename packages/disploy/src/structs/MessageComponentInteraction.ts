import type { APIMessageComponentInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { BaseInteraction } from './BaseInteraction';

export class MessageComponentInteraction extends BaseInteraction {
	/**
	 * The custom ID of the component.
	 */
	public customId!: string;

	public constructor(app: App, raw: APIMessageComponentInteraction) {
		super(app, raw);
		this.customId = raw.data.custom_id;
	}
}
