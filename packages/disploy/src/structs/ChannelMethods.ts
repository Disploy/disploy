import { Routes, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

export class ChannelMethods extends Base {
	/**
	 * The ID of the channel.
	 */
	public id: Snowflake;

	public constructor(app: App, raw: { id: string }) {
		super(app);
		this.id = raw.id;
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
