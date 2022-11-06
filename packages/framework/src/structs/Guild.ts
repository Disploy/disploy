import type { APIGuild, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';
import { Channel } from './Channel';
import { ToBeFetched } from './ToBeFetched';

export class Guild extends Base {
	/**
	 * The ID of the guild.
	 */
	public id!: Snowflake;

	/**
	 * The owner ID of the guild.
	 */
	public ownerId!: Snowflake;

	/**
	 * The name of the guild.
	 */
	public name!: string;

	/**
	 * The AFK channel of the guild.
	 */
	public afkChannel!: ToBeFetched<Channel> | null;

	/**
	 * The AFK channel's ID of the guild.
	 */
	public afkChannelId!: Snowflake | null;

	/**
	 * The time in seconds a user has to be AFK before being moved to the AFK channel.
	 */
	public afkTimeout!: number;

	public constructor(app: App, raw: APIGuild) {
		super(app);
		this.id = raw.id;
		this.ownerId = raw.owner_id;
		this.name = raw.name;

		this.afkChannel = raw.afk_channel_id
			? new ToBeFetched(this, Channel, () => app.rest.get(`/channels/${raw.afk_channel_id}`))
			: null;
		this.afkChannelId = raw.afk_channel_id;
		this.afkTimeout = raw.afk_timeout;
	}
}
