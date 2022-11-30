import type {
	APIGuildMember,
	APIInteractionDataResolvedGuildMember,
	GatewayGuildMemberRemoveDispatchData,
	Snowflake,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';

export class PartialGuildMember extends Base {
	/**
	 * The nickname of the member.
	 */
	public nickname!: string | null;

	/**
	 * The member's guild avatar hash.
	 */
	public avatar!: string | null;

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

	public constructor(
		app: App,
		raw: APIGuildMember | APIInteractionDataResolvedGuildMember | GatewayGuildMemberRemoveDispatchData,
	) {
		super(app);
		this.nickname = 'nick' in raw ? raw.nick ?? null : null;
		this.avatar = 'avatar' in raw ? raw.avatar ?? null : null;
		this.roles = 'roles' in raw ? raw.roles : [];
		this.joinedAt = 'joined_at' in raw ? raw.joined_at : '';
		this.premiumSince = 'premium_since' in raw ? raw.premium_since ?? null : null;
		this.pending = 'pending' in raw ? raw.pending ?? null : null;
		this.communicationDisabledUntil =
			'communication_disabled_until' in raw ? Boolean(raw.communication_disabled_until) ?? null : null;
	}
}
