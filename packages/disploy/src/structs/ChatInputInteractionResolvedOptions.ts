import type { Snowflake } from 'discord-api-types/v10';
import { Attachment } from './Attachment';
import { Base } from './Base';
import type { BaseChannel } from './BaseChannel';
import type { ChatInputInteraction } from './ChatInputInteraction';
import { PartialChannel } from './PartialChannel';
import { PartialGuildMember } from './PartialGuildMember';
import { User } from './User';

export class ChatInputInteractionResolvedOptions extends Base {
	/**
	 * The interaction the resolved options belong to.
	 */
	public interaction: ChatInputInteraction;

	/**
	 * The resolved members.
	 */
	public members: Map<Snowflake, PartialGuildMember>;

	/**
	 * The resolved users.
	 */
	public users: Map<Snowflake, User>;

	/**
	 * The resolved channels.
	 */
	public channels: Map<Snowflake, BaseChannel>;

	/**
	 * The resolved attachments.
	 */
	public attachments: Map<Snowflake, Attachment>;

	constructor(interaction: ChatInputInteraction) {
		super(interaction.app);
		this.interaction = interaction;
		this.members = new Map();
		this.users = new Map();
		this.channels = new Map();
		this.attachments = new Map();

		if (!interaction.raw.data.resolved) return;

		const { users, members, channels, attachments } = interaction.raw.data.resolved;

		if (users) {
			for (const user in users) {
				this.users.set(user, new User(this.interaction.app, users[user]!));
			}
		}

		if (channels) {
			for (const channel in channels) {
				this.channels.set(channel, new PartialChannel(this.interaction.app, channels[channel]!));
			}
		}

		if (members) {
			for (const member in members) {
				if (!this.users.has(member)) {
					this.interaction.app.logger.debug(`An invalid member with the id ${member} was provided`);
				}

				this.members.set(member, new PartialGuildMember(this.interaction.app, members[member]!));
			}
		}

		if (attachments) {
			for (const attachment in attachments) {
				this.attachments.set(attachment, new Attachment(this.interaction.app, attachments[attachment]!));
			}
		}
	}
}
