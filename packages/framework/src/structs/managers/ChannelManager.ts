import { ChannelType, RESTGetAPIChannelResult, Routes } from 'discord-api-types/v10';
import type { App } from '../../client';
import type { DiscordChannel } from '../../types';
import { Base } from '../Base';
import { GuildTextChannel } from '../GuildTextChannel';
import { GuildVoiceChannel } from '../GuildVoiceChannel';

export class ChannelManager extends Base {
	public constructor(app: App) {
		super(app);
	}

	public async fetch(id: string): Promise<DiscordChannel> {
		const raw = await this.app.rest.get<RESTGetAPIChannelResult>(Routes.channel(id));

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
