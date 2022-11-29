import { APIChannel, ChannelType, RESTGetAPIChannelResult, Routes } from 'discord-api-types/v10';
import type { App } from '../../client';
import type { DiscordChannel } from '../../types';
import { Base } from '../Base';
import { GuildTextChannel } from '../GuildTextChannel';
import { GuildVoiceChannel } from '../GuildVoiceChannel';

export class ChannelManager extends Base {
	private guildId?: string;

	/**
	 * A manager for fetching channels.
	 * @param app
	 * @param guildId The ID of the guild to lock the manager to.
	 */
	public constructor(app: App, guildId?: string) {
		super(app);
		this.guildId = guildId;
	}

	/**
	 * Fetch a channel by its ID.
	 * @param id The ID of the channel to fetch.
	 * @returns A constructed channel structure.
	 */
	public async fetch(id: string): Promise<DiscordChannel> {
		const raw = await this.app.rest.get<RESTGetAPIChannelResult>(Routes.channel(id));

		return this.constructChannel(raw);
	}

	/**
	 * Construct a channel from a raw channel object.
	 * @param raw The raw channel data.
	 * @returns A constructed channel structure.
	 */
	public constructChannel(raw: APIChannel): DiscordChannel {
		if (this.guildId !== undefined && 'guild_id' in raw && raw.guild_id !== this.guildId) {
			throw new Error(`Channel is not in the guild (${this.guildId})`);
		}

		switch (raw.type) {
			case ChannelType.GuildText:
				return new GuildTextChannel(this.app, raw);
			case ChannelType.GuildVoice:
				return new GuildVoiceChannel(this.app, raw);
			default:
				throw new Error(`Unknown channel type: ${raw.type}`);
		}
	}
}
