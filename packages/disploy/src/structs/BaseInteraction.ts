import {
	APIInteraction,
	APIInteractionResponseCallbackData,
	InteractionResponseType,
	Routes,
	Snowflake,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { RouterEvents } from '../router';
import { DiscordAPIUtils, SnowflakeUtil } from '../utils';
import { Base } from './Base';
import { Guild } from './Guild';
import { GuildMember } from './GuildMember';
import { ToBeFetched } from './ToBeFetched';
import type { User } from './User';

export class BaseInteraction extends Base {
	/**
	 * The ID of the interaction.
	 */
	public id!: Snowflake;

	/**
	 * Timestamp of when the interaction was created.
	 */
	public createdTimestamp!: number;

	/**
	 * The token of the interaction.
	 */
	public token!: string;

	/**
	 * The User that invoked the interaction.
	 */
	public user: User;

	/**
	 * The GuildMember who invoked the interaction.
	 */
	public member!: GuildMember | null;

	/**
	 * The guild of the interaction.
	 */
	public guild!: ToBeFetched<Guild> | null;

	public constructor(app: App, raw: APIInteraction) {
		super(app);
		this.id = raw.id;
		this.token = raw.token;
		this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
		this.user = DiscordAPIUtils.resolveUserFromInteraction(app, raw);
		this.member = raw.member ? new GuildMember(this.app, raw.member) : null;
		this.guild = raw.guild_id
			? new ToBeFetched(this.app, Guild, raw.guild_id, (id) => app.rest.get(Routes.guild(id)))
			: null;
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
