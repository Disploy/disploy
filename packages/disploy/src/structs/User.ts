import type { APIUser, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

export class User extends Base {
	/**
	 * The ID of the user.
	 * @example '97470053615673344'
	 */
	public id!: Snowflake;

	/**
	 * The username of the user.
	 * @example 'Disploy'
	 */
	public username!: string;

	/**
	 * The tag of the user.
	 * @example 'tristan#0005'
	 */
	public get tag(): `${string}#${string}` {
		return `${this.username}#${this.discriminator}`;
	}

	/**
	 * The discriminator of the user.
	 * @example '0005'
	 */
	public discriminator!: string;

	public constructor(app: App, raw: APIUser) {
		super(app);
		this.id = raw.id;
		this.username = raw.username;
		this.discriminator = raw.discriminator;
	}
}
