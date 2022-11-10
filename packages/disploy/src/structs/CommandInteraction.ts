import {
	APIApplicationCommandInteraction,
	APIInteractionResponseCallbackData,
	InteractionResponseType,
	Routes,
	Snowflake,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { RouterEvents } from '../router';
import { BaseInteraction } from './BaseInteraction';
import { GuildMember } from './GuildMember';
import { User } from './User';

export class CommandInteraction extends BaseInteraction {
	/**
	 * The ID of the command.
	 */
	public commandId: Snowflake;

	/**
	 * The ID of the command.
	 */
	public member: GuildMember | null;

	/**
	 * The ID of the command.
	 */
	public user: User | null;

	/**
	 * The name of the command.
	 */
	public commandName: string;

	public constructor(app: App, raw: APIApplicationCommandInteraction) {
		super(app, raw);
		this.commandId = raw.data.id;
		this.commandName = raw.data.name;
		this.member = raw.member ? new GuildMember(this.app, raw.member) : null;
		this.user = raw.member ? (raw.member.user ? new User(this.app, raw.member.user) : null) : null;
	}

	public deferReply() {
		return void this.app.router.emit(RouterEvents.Respond(this.id), {
			type: InteractionResponseType.DeferredChannelMessageWithSource,
		});
	}

	public reply(payload: APIInteractionResponseCallbackData) {
		return void this.app.router.emit(RouterEvents.Respond(this.id), {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: payload,
		});
	}

	public async editReply(payload: APIInteractionResponseCallbackData) {
		return await this.app.rest.patch(Routes.webhookMessage(this.app.clientId, this.token), {
			...payload,
		});
	}
}
