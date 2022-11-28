import type { APIApplicationCommandInteraction, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { BaseInteraction } from './BaseInteraction';

export class CommandInteraction extends BaseInteraction {
	/**
	 * The ID of the command.
	 */
	public commandId: Snowflake;

	/**
	 * The name of the command.
	 */
	public commandName: string;

	public constructor(app: App, raw: APIApplicationCommandInteraction) {
		super(app, raw);
		this.commandId = raw.data.id;
		this.commandName = raw.data.name;
	}
}
