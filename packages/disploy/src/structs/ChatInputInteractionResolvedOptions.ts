import type { Snowflake } from 'discord-api-types/v10';
import { Base } from './Base';
import type { BaseChannel } from './BaseChannel';
import type { ChatInputInteraction } from './ChatInputInteraction';
import { PartialChannel } from './PartialChannel';
import { PartialGuildMember } from './PartialGuildMember';
import { User } from './User';

export class ChatInputInteractionResolvedOptions extends Base {
	public interaction: ChatInputInteraction;
	public members: Map<Snowflake, PartialGuildMember>;
	public users: Map<Snowflake, User>;
	public channels: Map<Snowflake, BaseChannel>;
	constructor(interaction: ChatInputInteraction) {
		super(interaction.app);
		/**
		 * The interaction the resolved options belong to.
		 */
		this.interaction = interaction;

		/**
		 * The resolved members.
		 */
		this.members = new Map();
		/**
		 * The resolved users.
		 */
		this.users = new Map();
		/**
		 * The resolved channels.
		 */
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
