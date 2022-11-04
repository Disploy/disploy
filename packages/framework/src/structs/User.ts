import type { APIUser, Snowflake } from 'discord-api-types/v10';

export class User {
	/**
	 * The ID of the user.
	 */
	public id!: Snowflake;

	/**
	 * The name of the user.
	 */
	public name!: string;

	/**
	 * The discriminator of the user.
	 */
	public discriminator!: string;

	public constructor(raw: APIUser) {
		this.id = raw.id;
		this.name = raw.username;
		this.discriminator = raw.discriminator;
	}
}
