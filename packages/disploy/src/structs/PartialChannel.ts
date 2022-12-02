import type { APIPartialChannel, ChannelType } from 'discord-api-types/v10';
import type { App } from '../client';
import type { DiscordChannel } from '../types';
import { SnowflakeUtil } from '../utils';
import { ChannelMethods } from './ChannelMethods';

export class PartialChannel extends ChannelMethods {
	/**
	 * Timestamp of when the channel was created.
	 */
	public createdTimestamp: number;

	/**
	 * The name of the channel.
	 */
	public name?: string;

	/**
	 * The type of the channel.
	 */
	public type: ChannelType;

	public constructor(app: App, raw: APIPartialChannel) {
		super(app, raw);
		this.id = raw.id;
		this.name = raw.name;
		this.type = raw.type;
		this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
	}

	/**
	 * Fetch the full channel.
	 * @returns The full channel.
	 */
	public async fetch(): Promise<DiscordChannel> {
		return this.app.channels.fetch(this.id);
	}
}
