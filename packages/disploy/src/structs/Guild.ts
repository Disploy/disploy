import { APIGuild, Routes, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { SnowflakeUtil } from '../utils';
import { Base } from './Base';
import { GuildBan } from './GuildBan';
import { GuildMember } from './GuildMember';
import { GuildVoiceChannel } from './GuildVoiceChannel';
import { ChannelManager, StructureManager } from './managers';
import { ToBeFetched } from './ToBeFetched';

export class Guild extends Base {
	/**
	 * The ID of the guild.
	 */
	public id!: Snowflake;

	/**
	 * The owner ID of the guild.
	 */
	public ownerId!: Snowflake;

	/**
	 * The name of the guild.
	 */
	public name!: string;

	/**
	 * The AFK channel of the guild.
	 */
	public afkChannel!: ToBeFetched<GuildVoiceChannel> | null;

	/**
	 * The AFK channel's ID of the guild.
	 */
	public afkChannelId!: Snowflake | null;

	/**
	 * The time in seconds a user has to be AFK before being moved to the AFK channel.
	 */
	public afkTimeout!: number;

	/**
	 * The ID of the application that owns the guild. (if it is a bot application)
	 */
	public applicationId!: Snowflake | null;

	/**
	 * The approximate number of members in the guild.
	 * @warning You will need to use {@link Guild#fetch} to get this value.
	 */
	public approximateMemberCount?: number;

	/**
	 * The approximate number of presences in the guild.
	 * @warning You will need to use {@link Guild#fetch} to get this value.
	 */
	public approximatePresenceCount?: number;

	/**
	 * The hash of the guild banner
	 */
	public banner!: string | null;

	/**
	 * The ban manager for this guild.
	 */
	public bans!: StructureManager<GuildBan>;

	/**
	 * Shortcut to {@link App#channels}
	 */
	public channels!: ChannelManager;

	/**
	 * Timestamp of when the channel was created.
	 */
	public createdTimestamp!: number;

	/**
	 * The description of the guild (if it has one).
	 */
	public description!: string | null;

	/**
	 * The member manager for this guild.
	 */
	public members!: StructureManager<GuildMember>;

	/**
	 * 	The NSFW level for this guild.
	 */
	public nsfwLevel!: number;
	/**
	 * The raw data of the guild.
	 */
	declare public raw: APIGuild;
	public constructor(app: App, raw: APIGuild) {
		super(app, raw);
		this.patch(raw);
		this.channels = new ChannelManager(app, this.id);
	}

	private patch(raw: APIGuild): this {
		this.id = raw.id;
		this.ownerId = raw.owner_id;
		this.name = raw.name;

		this.afkChannel = raw.afk_channel_id
			? new ToBeFetched(this.app, GuildVoiceChannel, raw.afk_channel_id, (id) => this.app.rest.get(Routes.channel(id)))
			: null;
		this.afkChannelId = raw.afk_channel_id;
		this.afkTimeout = raw.afk_timeout;
		this.applicationId = raw.application_id;
		this.banner = raw.banner;
		this.bans = new StructureManager(this.app, GuildBan, async (id) => {
			return {
				guild: this,
				raw: await this.app.rest.get(Routes.guildBan(this.id, id)),
			};
		});
		this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
		this.description = raw.description;
		this.members = new StructureManager(this.app, GuildMember, async (id) =>
			this.app.rest.get(Routes.guildMember(this.id, id)),
		);

		if ('approximate_member_count' in raw) {
			this.approximateMemberCount = raw.approximate_member_count;
		}

		if ('approximate_presence_count' in raw) {
			this.approximatePresenceCount = raw.approximate_presence_count;
		}

		this.nsfwLevel = raw.nsfw_level;

		return this;
	}

	public async fetch(): Promise<this> {
		return this.patch(await this.app.rest.get<APIGuild>(`${Routes.guild(this.id)}?with_counts=true`));
	}
}
