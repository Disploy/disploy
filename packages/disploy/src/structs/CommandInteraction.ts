import type { APIApplicationCommandInteraction, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { BaseInteraction } from './BaseInteraction';
import { GuildMember } from './GuildMember';

export class CommandInteraction extends BaseInteraction {
	/**
	 * The ID of the command.
	 */
	public commandId: Snowflake;

	/**
	 * The ID of the command.
	 */
	public member: GuildMember | null;

	/**
	 * The name of the command.
	 */
	public commandName: string;

	public constructor(app: App, raw: APIApplicationCommandInteraction) {
		super(app, raw);
		this.commandId = raw.data.id;
		this.commandName = raw.data.name;
		this.member = raw.member ? new GuildMember(this.app, raw.member) : null;
	}
}
