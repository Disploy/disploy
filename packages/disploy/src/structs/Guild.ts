import type { APIGuild, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

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

	public constructor(app: App, raw: APIGuild) {
		super(app);
		this.id = raw.id;
		this.ownerId = raw.owner_id;
		this.name = raw.name;
	}
}
