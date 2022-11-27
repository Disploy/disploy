import { APIGuildChannel, ChannelType, Snowflake } from "discord-api-types/v10";
import type { BaseChannel } from "./BaseChannel";
import type { ChatInputInteraction } from "./ChatInputInteraction";
import { GuildTextChannel } from "./GuildTextChannel";
import { GuildVoiceChannel } from "./GuildVoiceChannel";
import { PartialGuildMember } from "./PartialGuildMember";
import { User } from "./User";

export class ChatInputInteractionResolvedOptions {
    public interaction: ChatInputInteraction;
    public members: Map<Snowflake, PartialGuildMember>;
    public users: Map<Snowflake, User>;
    public channels: Map<Snowflake, BaseChannel>
    constructor(interaction: ChatInputInteraction) {
        /**
         * The interaction the resolved options belong to.
         */
        this.interaction = interaction;
        
        /**
         * The resolved members.
         */
        this.members = new Map()
        /**
         * The resolved users.
         */
        this.users = new Map()
        /**
         * The resolved channels.
         */
        this.channels = new Map()
        if (!interaction.raw.data.resolved) return;
        const { users, members, channels } = interaction.raw.data.resolved;
        if (users) {
            for (const user in users) {
                this.users.set(user, new User(this.interaction.app, users[user]!))
            }
        }
        if (channels) {
            for (const channel in channels) {
                this.channels.set(channel,
                    channels[channel]!.type === ChannelType.GuildText ? 
                    new GuildTextChannel(this.interaction.app, channels[channel] as APIGuildChannel<ChannelType.GuildText>) : 
                    new GuildVoiceChannel(this.interaction.app, channels[channel] as APIGuildChannel<ChannelType.GuildVoice>))
            }
        }
        if (members) {
            for (const member in members) {
                if (!this.users.has(member)) {
                    this.interaction.app.logger.debug(`An invalid member with the id ${member} was provided`)
                }
                this.members.set(member,
                    new PartialGuildMember(this.interaction.app, { user: this.users.get(member)!.raw, ...members[member] })
                )
            }
        }
    }
}