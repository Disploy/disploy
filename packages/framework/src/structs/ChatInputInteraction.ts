import {
	APIChatInputApplicationCommandInteraction,
	APIInteractionResponseCallbackData,
	InteractionResponseType,
	Routes,
	Snowflake,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { RouterEvents } from '../router';
import { BaseInteraction } from './BaseInteraction';
import { ChatInputInteractionOptions } from './ChatInputInteractionOptions';
import { GuildMember } from './GuildMember';
import { User } from './User';

export class ChatInputInteraction extends BaseInteraction {
	/**
	 * The ID of the command.
	 */
	public commandId!: Snowflake;

	/**
	 * The name of the command.
	 */
	public commandName!: string;

	/**
	 * The options of the interaction.
	 */
	public options!: ChatInputInteractionOptions;

	/**
	 * The GuildMember who invoked the interaction.
	 */
	public member!: GuildMember | null;

	/**
	 * The User who invoked the interaction.
	 */
	public user!: User | null;

	public constructor(app: App, public raw: APIChatInputApplicationCommandInteraction) {
		super(app, raw);
		this.commandId = raw.data.id;
		this.commandName = raw.data.name;
		this.member = raw.member ? new GuildMember(this.app, raw.member) : null;
		this.user = raw.member ? (raw.member.user ? new User(this.app, raw.member.user) : null) : null;
		this.options = new ChatInputInteractionOptions(app, this);
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
