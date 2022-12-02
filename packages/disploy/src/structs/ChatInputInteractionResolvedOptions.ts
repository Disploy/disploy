import type { Snowflake } from 'discord-api-types/v10';
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

	constructor(interaction: ChatInputInteraction) {
		super(interaction.app);
		this.interaction = interaction;
		this.members = new Map();
		this.users = new Map();
		this.channels = new Map();

		if (!interaction.raw.data.resolved) return;

		const { users, members, channels } = interaction.raw.data.resolved;

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
	}
}
