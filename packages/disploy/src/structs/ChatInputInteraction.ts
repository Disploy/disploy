import type { APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { ChatInputInteractionOptions } from './ChatInputInteractionOptions';
import { CommandInteraction } from './CommandInteraction';

export class ChatInputInteraction extends CommandInteraction {
	/**
	 * The options of the interaction.
	 */
	public options: ChatInputInteractionOptions;

	public constructor(app: App, public raw: APIChatInputApplicationCommandInteraction) {
		super(app, raw);
		this.options = new ChatInputInteractionOptions(app, this);
	}
}
