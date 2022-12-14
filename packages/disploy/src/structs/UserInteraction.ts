import type {
	APIInteractionDataResolvedGuildMember,
	APIUserApplicationCommandInteraction,
	Snowflake,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { BaseInteraction } from './BaseInteraction';
import { PartialGuildMember } from './PartialGuildMember';
import { User } from './User';

export class UserInteraction extends BaseInteraction {
	/**
	 * The ID of the command.
	 */
	public commandId!: Snowflake;

	/**
	 * The name of the command.
	 */
	public commandName!: string;

	/**
	 * The targeted User's id.
	 */
	public targetId!: Snowflake;

	/**
	 * The targeted GuildMember.
	 */
	public targetMember!: PartialGuildMember | null;

	/**
	 * The targeted User.
	 */
	public targetUser!: User | null;

	public constructor(app: App, public raw: APIUserApplicationCommandInteraction) {
		super(app, raw);
		this.commandId = raw.data.id;
		this.commandName = raw.data.name;
		this.targetId = raw.data.target_id;
		this.targetMember = raw.data.resolved.members
			? new PartialGuildMember(
					this.app,
					raw.data.resolved.members[this.targetId] as APIInteractionDataResolvedGuildMember,
			  )
			: null;
		this.targetUser = new User(this.app, raw.data.resolved.users[raw.data.target_id]!);
	}
}
