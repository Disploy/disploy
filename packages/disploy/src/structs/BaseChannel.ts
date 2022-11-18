import { APIChannel, ChannelType, Routes, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { SnowflakeUtil } from '../utils';
import { Base } from './Base';

export abstract class BaseChannel extends Base {
	/**
	 * The ID of the channel.
	 */
	public id!: Snowflake;

	/**
	 * Timestamp of when the channel was created.
	 */
	public createdTimestamp!: number;

	/**
	 * The type of the channel.
	 */
	public abstract type: ChannelType;

	public constructor(app: App, raw: APIChannel) {
		super(app);
		this.id = raw.id;
		this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
	}

	/**
	 * Deletes the channel.
	 */
	public async delete(): Promise<void> {
		await this.app.rest.delete(Routes.channel(this.id));
	}

	/**
	 * Returns a string that represents the Channel object as a mention.
	 * @returns A string that represents the Channel object as a mention.
	 * @example interaction.reply(`You chose ${interaction.channel}`); // => You chose #general
	 */
	public override toString() {
		return this.id;
	}
}
