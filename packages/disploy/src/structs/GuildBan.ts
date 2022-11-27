import type { APIBan } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';
import type { Guild } from './Guild';
import { User } from './User';

export class GuildBan extends Base {
	/**
	 * The guild this ban belongs to.
	 */
	public guild!: Guild;

	/**
	 * The user this ban belongs to.
	 */
	public user!: User;

	/**
	 * The reason for this ban.
	 */
	public reason!: string | null;
	/**
	 * The raw data of the ban.
	 */
	 declare public raw: APIBan;
	public constructor(app: App, { raw, guild }: { raw: APIBan; guild: Guild }) {
		super(app, raw);
		this.guild = guild;
		this.user = new User(app, raw.user);
		this.reason = raw.reason;
	}
}
