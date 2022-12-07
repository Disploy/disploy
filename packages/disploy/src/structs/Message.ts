import type { Snowflake } from 'discord-api-types/globals';
import {
	APIActionRowComponent,
	APIApplication,
	APIAttachment,
	APIChannel,
	APIChannelMention,
	APIEmbed,
	APIMessage,
	APIMessageActionRowComponent,
	APIMessageActivity,
	APIMessageInteraction,
	APIMessageReference,
	APIReaction,
	APIStickerItem,
	MessageFlags,
	MessageType,
	RESTPatchAPIChannelMessageJSONBody,
	RESTPostAPIChannelMessageJSONBody,
	Routes,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';
import { User } from './User';

export class Message extends Base {
	/**
	 * The ID of the message.
	 */
	public readonly id: Snowflake;

	/**
	 * The content of the message.
	 */
	public readonly content: string;

	/**
	 * The ID of the channel the message was sent in.
	 */
	public readonly channelId: Snowflake;

	/**
	 * The user that sent the message.
	 */
	public readonly author: User;

	/**
	 * The timestamp of when the message was sent.
	 */
	public readonly timestamp: number;

	/**
	 * The timestamp of when the message was last edited.
	 */
	public readonly editedTimestamp: number | null;

	/**
	 * Whether the message is a TTS message.
	 */
	public readonly tts: boolean;

	/**
	 * Whether the message mentions everyone.
	 */
	public readonly mentionEveryone: boolean;

	/**
	 * The users mentioned in the message.
	 */
	public readonly mentions: User[];

	/**
	 * The roles mentioned in this message.
	 */
	public readonly mentionedRoles: Snowflake[];

	/**
	 * The channels mentioned in this message.
	 */
	public readonly mentionChannels: APIChannelMention[];

	/**
	 * The attachments present in the message.
	 */
	public readonly attachments: APIAttachment[];

	/**
	 * The embeds present in the message.
	 */
	public readonly embeds: APIEmbed[];

	/**
	 * The reactions present in the message.
	 */
	public readonly reactions?: APIReaction[];

	/**
	 * The nonce of the message.
	 */
	public readonly nonce?: string | number;

	/**
	 * Whether the message is pinned in it's channel.
	 */
	public readonly pinned: boolean;

	/**
	 * The webhook ID of the message.
	 */
	public readonly webhookId?: Snowflake;

	/**
	 * The type of the message.
	 */
	public readonly type: MessageType;

	/**
	 * The activity present in the message.
	 */
	public readonly activity?: APIMessageActivity;

	/**
	 * The associated application of the message.
	 */
	public readonly application?: Partial<APIApplication>;

	/**
	 * The ID of the associated application of the message.
	 */
	public readonly applicationId?: Snowflake;

	/**
	 * The message reference of the message.
	 */
	public readonly messageReference?: APIMessageReference;

	/**
	 * The flags of the message.
	 */
	public readonly flags?: MessageFlags;

	/**
	 * The reference to the message.
	 */
	public readonly referencedMessage?: Message;

	/**
	 * The interaction of the message.
	 */
	public readonly interaction?: APIMessageInteraction;

	/**
	 * The thread started by the message.
	 */
	public readonly thread?: APIChannel;

	/**
	 * The components in this message.
	 */
	public readonly components: APIActionRowComponent<APIMessageActionRowComponent>[];

	/**
	 * The stickers in this message.
	 */
	public readonly stickerItems: APIStickerItem[];

	public constructor(app: App, raw: APIMessage) {
		super(app);
		this.id = raw.id;
		this.content = raw.content;
		this.channelId = raw.channel_id;
		this.author = new User(this.app, raw.author);
		this.timestamp = new Date(raw.timestamp).getTime();
		this.editedTimestamp = raw.edited_timestamp ? new Date(raw.edited_timestamp).getTime() : null;
		this.tts = raw.tts;
		this.mentionEveryone = raw.mention_everyone;
		this.mentions = raw.mentions.map((user) => new User(this.app, user));
		this.mentionedRoles = raw.mention_roles;
		this.mentionChannels = raw.mention_channels ?? [];
		this.attachments = raw.attachments;
		this.embeds = raw.embeds;
		this.reactions = raw.reactions;
		this.nonce = raw.nonce;
		this.pinned = raw.pinned;
		this.webhookId = raw.webhook_id;
		this.type = raw.type;
		this.activity = raw.activity;
		this.application = raw.application;
		this.applicationId = raw.application_id;
		this.messageReference = raw.message_reference;
		this.flags = raw.flags;
		this.referencedMessage = raw.referenced_message
			? this.app.messages.constructMessage(raw.referenced_message)
			: undefined;
		this.interaction = raw.interaction;
		this.thread = raw.thread;
		this.components = raw.components ?? [];
		this.stickerItems = raw.sticker_items ?? [];
	}

	/**
	 * Replies to the message.
	 * @param payload The payload to send.
	 * @returns The created message.
	 */
	public async reply(payload: Omit<RESTPostAPIChannelMessageJSONBody, 'message_reference'>): Promise<Message> {
		return this.app.messages.constructMessage(
			await this.app.rest.post<RESTPostAPIChannelMessageJSONBody, APIMessage>(Routes.channelMessages(this.channelId), {
				...payload,
				message_reference: {
					message_id: this.id,
					channel_id: this.channelId,
				},
			}),
		);
	}

	/**
	 * Deletes the message.
	 * @throws If the message is not deletable by the logged in application.
	 */
	public async delete(): Promise<null> {
		await this.app.rest.delete(Routes.channelMessage(this.channelId, this.id));
		return null;
	}

	/**
	 * Edits the message.
	 * @param payload The payload to patch.
	 * @returns The edited message.
	 */
	public async edit(payload: RESTPatchAPIChannelMessageJSONBody): Promise<Message> {
		return this.app.messages.constructMessage(
			await this.app.rest.patch<RESTPatchAPIChannelMessageJSONBody, APIMessage>(
				Routes.channelMessage(this.channelId, this.id),
				payload,
			),
		);
	}
}
