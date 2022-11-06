import type { APIUser, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

export class User extends Base {
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

	public constructor(app: App, raw: APIUser) {
		super(app);
		this.id = raw.id;
		this.name = raw.username;
		this.discriminator = raw.discriminator;
	}
}
