import type { APIGuildMember } from 'discord-api-types/v10';
import type { App } from '../client';
import { PartialGuildMember } from './PartialGuildMember';
import { User } from './User';

export class GuildMember extends PartialGuildMember {
	/**
	 * The User object of the member.
	 */
	declare public user: User;

	/**
	 * Whether the user is deafened in voice channels
	 */
	public deaf!: boolean | null;

	/**
	 * Whether the user is muted in voice channels
	 */
	public mute!: boolean | null;
	public constructor(app: App, raw: APIGuildMember) {
		super(app, raw);
		this.user = raw.user instanceof User ? raw.user : new User(this.app, raw.user!);
		this.deaf = raw.deaf ? Boolean(raw.deaf) : null;
		this.mute = raw.mute ? Boolean(raw.mute) : null;
	}
}
