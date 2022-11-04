import type { APIGuild, Snowflake } from 'discord-api-types/v10';

export class Guild {
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

	public constructor(raw: APIGuild) {
		this.id = raw.id;
		this.ownerId = raw.owner_id;
		this.name = raw.name;
	}
}
