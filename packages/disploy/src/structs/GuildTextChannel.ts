import { APIGuildChannel, ChannelType, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { BaseChannel } from './BaseChannel';

export class GuildTextChannel extends BaseChannel {
	/**
	 * The ID of the guild.
	 */
	public guildId!: Snowflake;

	/**
	 * The name of the channel.
	 */
	public name!: string;

	/**
	 * The type of the channel.
	 */
	public type: ChannelType.GuildText = ChannelType.GuildText;

	public constructor(app: App, public override raw: APIGuildChannel<ChannelType.GuildText>) {
		super(app, raw);
		this.guildId = raw.guild_id!;
		this.name = raw.name!;
		this.type = ChannelType.GuildText;
	}

	/**
	 * Returns a string that represents the Channel object as a mention.
	 * @returns A string that represents the Channel object as a mention.
	 * @example interaction.reply(`You chose ${interaction.channel}`); // => You chose #general
	 */
	public override toString() {
		return `<#${this.id}>`;
	}
}
