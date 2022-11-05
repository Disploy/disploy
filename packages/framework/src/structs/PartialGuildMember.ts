import type {APIGuildMember, Snowflake} from "discord-api-types/v10";

export class PartialGuildMember {
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
    public joined_at!: string;

    /**
     * When the user started boosting the guild.
     */
    public premium_since!: string | null;

    /**
     * Whether the user has not yet passed the guild's Membership Screening requirements.
     */
    public pending!: boolean | null;

    /**
     * Timestamp of when the time out will be removed; until then, they cannot interact with the guild.
     */
    public communication_disabled_until!: boolean | null;

    public constructor(raw: APIGuildMember) {
        this.nickname = raw.nick ?? null;
        this.avatar = raw.avatar ?? null;
        this.roles = raw.roles;
        this.joined_at = raw.joined_at;
        this.premium_since = raw.premium_since ?? null;
        this.pending = raw.pending ?? null;
        this.communication_disabled_until = Boolean(raw.communication_disabled_until) ?? null;
    }
}
