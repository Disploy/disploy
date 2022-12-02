import type { APIChannel, ChannelType } from 'discord-api-types/v10';
import type { App } from '../client';
import { SnowflakeUtil } from '../utils';
import { ChannelMethods } from './ChannelMethods';

export abstract class BaseChannel extends ChannelMethods {
	/**
	 * Timestamp of when the channel was created.
	 */
	public createdTimestamp!: number;

	/**
	 * The type of the channel.
	 */
	public abstract type: ChannelType;

	public constructor(app: App, raw: APIChannel) {
		super(app, raw);
		this.id = raw.id;
		this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
	}
}
