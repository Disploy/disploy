import type { APIGuildMember, APIInteractionDataResolvedGuildMember, APIUser, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

export class PartialGuildMember extends Base {
	/**
	 * The id of the member.
	 */
	public id!: Snowflake | null;
	/**
	 * The nickname of the member.
	 */
	public nickname!: string | null;

	/**
	 * The member's guild avatar hash.
	 */
	public avatar!: string | null;
	/**
	 * The user the member belongs to.
	 */
	public user!: Partial<APIUser>
	/**
	 * Array of role object ids.
	 */
	public roles!: Snowflake[];

	/**
	 * When the user joined the guild.
	 */
	public joinedAt!: string;

	/**
	 * When the user started boosting the guild.
	 */
	public premiumSince!: string | null;

	/**
	 * Whether the user has not yet passed the guild's Membership Screening requirements.
	 */
	public pending!: boolean | null;

	/**
	 * Timestamp of when the time out will be removed; until then, they cannot interact with the guild.
	 */
	public communicationDisabledUntil!: boolean | null;
	/**
	 * The raw data of the member.
	 */
	declare public raw: Partial<APIGuildMember | APIInteractionDataResolvedGuildMember>;
	public constructor(app: App, raw: Partial<APIGuildMember | APIInteractionDataResolvedGuildMember> & { id?: Snowflake }) {
		super(app, raw);
		this.user = 'user' in raw ? raw.user! : 'id' in raw ? { id: raw.id as Snowflake ?? null } : {}
		this.id = this.user.id ?? null
		this.nickname = raw.nick ?? null;
		this.avatar = raw.avatar ?? null;
		this.roles = raw.roles ?? [];
		this.joinedAt = raw.joined_at!;
		this.premiumSince = raw.premium_since ?? null;
		this.pending = raw.pending ?? null;
		this.communicationDisabledUntil = Boolean(raw.communication_disabled_until) ?? null;
	}
}
