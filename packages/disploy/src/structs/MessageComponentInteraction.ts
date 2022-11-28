import type { APIMessageComponentInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { RouteParams } from '../router';
import { BaseInteraction } from './BaseInteraction';

export class MessageComponentInteraction extends BaseInteraction {
	/**
	 * The custom ID of the component.
	 */
	public customId!: string;

	/**
	 * The parsed parameters of the interaction from the custom ID.
	 */
	public params!: RouteParams;

	public constructor(app: App, raw: APIMessageComponentInteraction, params?: RouteParams) {
		super(app, raw);
		this.customId = raw.data.custom_id;
		this.params = params || new RouteParams(this.app, '', '');
	}
}
