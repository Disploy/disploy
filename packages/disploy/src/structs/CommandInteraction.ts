import type { APIApplicationCommandInteraction, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { BaseInteraction } from './BaseInteraction';
import { GuildMember } from './GuildMember';
import { User } from './User';

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
	 * The ID of the command.
	 */
	public user: User | null;

	/**
	 * The name of the command.
	 */
	public commandName: string;

	public constructor(app: App, raw: APIApplicationCommandInteraction) {
		super(app, raw);
		this.commandId = raw.data.id;
		this.commandName = raw.data.name;
		this.member = raw.member ? new GuildMember(this.app, raw.member) : null;
		this.user = raw.user ? new User(this.app, raw.user) : raw.member?.user ? new User(this.app, raw.member.user) : null;
	}
}
