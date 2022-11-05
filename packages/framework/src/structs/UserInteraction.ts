import type {
    APIInteractionResponseCallbackData,
    APIUserApplicationCommandInteraction,
    Snowflake,
    APIInteractionDataResolvedGuildMember
} from "discord-api-types/v10";
import type { App } from "../client";
import { BaseInteraction } from "./BaseInteraction";
import { GuildMember } from "./GuildMember";
import { User } from "./User";
import {PartialGuildMember} from "./PartialGuildMember";

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
     * The options of the interaction.
     */
    //public options!: UserInteractionOptions;

    /**
     * The GuildMember who invoked the interaction.
     */
    public member!: GuildMember | null;

    /**
     * The User who invoked the interaction.
     */
    public user!: User | null;

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

    public constructor(
        app: App,
        public raw: APIUserApplicationCommandInteraction
    ) {
        super(app, raw);
        this.commandId = raw.data.id;
        this.commandName = raw.data.name;
        this.member = raw.member ? new GuildMember(raw.member) : null;
        this.user = raw.member
            ? raw.member.user
                ? new User(raw.member.user)
                : null
            : null;
        this.targetId = raw.data.target_id;
        this.targetMember = raw.data.resolved.members ? new PartialGuildMember(raw.data.resolved.members[this.targetId] as APIInteractionDataResolvedGuildMember) : null;
        this.targetUser = new User(raw.data.resolved.users[raw.data.target_id]!);
        //this.options = new UserInteractionOptions(app, this);
    }

    public reply(payload: APIInteractionResponseCallbackData) {
        return void this.app.router.emit(`${this.id}-respond`, {
            type: 4,
            data: payload,
        });
    }
}
