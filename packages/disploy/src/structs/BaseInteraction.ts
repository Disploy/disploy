import {
	APIInteraction,
	APIInteractionResponseCallbackData,
	InteractionResponseType,
	MessageFlags,
	RESTGetAPIWebhookWithTokenMessageResult,
	RESTPatchAPIWebhookWithTokenMessageJSONBody,
	RESTPatchAPIWebhookWithTokenMessageResult,
	RESTPostAPIWebhookWithTokenJSONBody,
	RESTPostAPIWebhookWithTokenWaitResult,
	Routes,
	Snowflake,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { RouterEvents } from '../router';
import { DiscordAPIUtils, SnowflakeUtil } from '../utils';
import { Base } from './Base';
import { Guild } from './Guild';
import { GuildMember } from './GuildMember';
import type { Message } from './Message';
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

	/**
	 * Defers the reply to the interaction.
	 * @param options The options to defer the reply with.
	 */
	public deferReply(options?: { ephemeral?: boolean; fetchReply?: true }): Promise<Message>;
	public deferReply({ ephemeral = false, fetchReply = false } = {}): Promise<null | Message> {
		this.app.router.emit(RouterEvents.Respond(this.id), {
			type: InteractionResponseType.DeferredChannelMessageWithSource,
			data: {
				flags: ephemeral ? MessageFlags.Ephemeral : undefined,
			},
		});

		if (fetchReply) {
			return this.fetchReply();
		}

		return Promise.resolve(null);
	}

	/**
	 * Send a reply to the interaction.
	 * @param payload The payload to send the reply with.
	 * @param fetchReply Whether to fetch the reply that was sent.
	 */
	public reply(payload: APIInteractionResponseCallbackData, fetchReply?: true): Promise<Message>;
	public reply(payload: APIInteractionResponseCallbackData, fetchReply = false): Promise<null | Message> {
		this.app.router.emit(RouterEvents.Respond(this.id), {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: payload,
		});

		if (fetchReply) {
			return this.fetchReply();
		}

		return Promise.resolve(null);
	}

	/**
	 * Send a followup message to the interaction.
	 * @param payload The payload to send the followup message with.
	 * @returns The sent message.
	 */
	public async followUp(payload: APIInteractionResponseCallbackData): Promise<Message> {
		const res = await this.app.rest.post<RESTPostAPIWebhookWithTokenJSONBody, RESTPostAPIWebhookWithTokenWaitResult>(
			`${Routes.webhook(this.app.clientId, this.token)}?wait=true`,
			payload,
		);

		return this.app.messages.constructMessage({ ...res, guild_id: this.guild?.id });
	}

	/**
	 * Edit the original reply that has been sent by the interaction.
	 * @param payload The payload to edit the reply with.
	 * @returns The edited message.
	 */
	public async editReply(payload: RESTPatchAPIWebhookWithTokenMessageJSONBody) {
		return this.app.messages.constructMessage({
			...(await this.app.rest.patch<
				RESTPatchAPIWebhookWithTokenMessageJSONBody,
				RESTPatchAPIWebhookWithTokenMessageResult
			>(Routes.webhookMessage(this.app.clientId, this.token), payload)),
			guild_id: this.guild?.id,
		});
	}

	/**
	 * Fetch the message reply that has been sent by the interaction.
	 * @returns The message that was sent by the interaction.
	 */
	public async fetchReply(id?: Snowflake) {
		return this.app.messages.constructMessage({
			...(await this.app.rest.get<RESTGetAPIWebhookWithTokenMessageResult>(
				Routes.webhookMessage(this.app.clientId, this.token, id),
			)),
			guild_id: this.guild?.id,
		});
	}
}
