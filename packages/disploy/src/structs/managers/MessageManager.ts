import { APIMessage, RESTGetAPIChannelMessageResult, Routes } from 'discord-api-types/v10';
import type { App } from '../../client';
import { Base } from '../Base';
import { Message } from '../Message';

export class MessageManager extends Base {
	/**
	 * A manager for manipulating messages.
	 * @param app
	 * @param guildId The ID of the guild to lock the manager to.
	 */
	public constructor(app: App) {
		super(app);
	}

	/**
	 * Fetch a message by its channel & message ID.
	 * @param gid The ID of the guild the message is in.
	 * @param cid The ID the channel the message is in.
	 * @param mid The ID of the message to fetch.
	 * @returns A constructed channel structure.
	 */
	public async fetch(gid: string, cid: string, mid: string): Promise<Message>;
	/**
	 * Fetch a message by its channel & message ID.
	 * @param cid The ID the channel the message is in.
	 * @param mid The ID of the message to fetch.
	 * @returns A constructed channel structure.
	 */
	public async fetch(cid: string, mid: string): Promise<Message>;
	public async fetch(arg1: string, arg2: string, arg3?: string): Promise<Message> {
		const [gid, cid, mid] = arg3 ? [arg1, arg2, arg3] : [undefined, arg1, arg2];
		const raw = await this.app.rest.get<RESTGetAPIChannelMessageResult>(Routes.channelMessage(cid, mid));

		return this.constructMessage({ ...raw, guild_id: gid });
	}

	/**
	 * Construct a message from a raw message object.
	 * @param raw The raw message data.
	 * @returns A constructed message structure.
	 */
	public constructMessage(raw: APIMessage & { guild_id?: string }): Message {
		return new Message(this.app, raw);
	}
}
