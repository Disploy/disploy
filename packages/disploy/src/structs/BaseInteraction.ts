import type { APIInteraction, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { SnowflakeUtil } from '../utils';
import { Base } from './Base';
import { Guild } from './Guild';
import { ToBeFetched } from './ToBeFetched';

export class BaseInteraction extends Base {
	/**
	 * The ID of the interaction.
	 */
	public id!: Snowflake;

	/**
	 * Timestamp of when the interaction was created.
	 */
	public createdTimestamp!: number;

	/**
	 * The token of the interaction.
	 */
	public token!: string;

	/**
	 * The guild of the interaction.
	 */
	public guild!: ToBeFetched<Guild> | null;

	public constructor(app: App, raw: APIInteraction) {
		super(app);
		this.id = raw.id;
		this.token = raw.token;
		this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
		this.guild = raw.guild_id ? new ToBeFetched(this.app, Guild, () => app.rest.get(`/guilds/${raw.guild_id}`)) : null;
	}
}
