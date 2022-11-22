import type { APIMessageComponentButtonInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { MessageComponentInteraction } from './MessageComponentInteraction';

export class ButtonInteraction extends MessageComponentInteraction {
	public constructor(app: App, raw: APIMessageComponentButtonInteraction) {
		super(app, raw);
	}
}
