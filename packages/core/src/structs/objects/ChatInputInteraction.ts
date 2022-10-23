import type {
  APIChatInputApplicationCommandInteraction,
  Snowflake,
} from "discord-api-types/v10";
import { BaseInteraction } from "./BaseInteraction";
import { GuildMember } from "./GuildMember";
import { User } from "./User";

export class ChatInputInteraction extends BaseInteraction {
  /**
   * The ID of the command.
   */
  public commandId!: Snowflake;

  /**
   * The name of the command.
   */
  public commandName!: string;

  /**
   * The GuildMember who invoked the interaction.
   */
  public member!: GuildMember | null;

  /**
   * The User who invoked the interaction.
   */
  public user!: User | null;

  public constructor(raw: APIChatInputApplicationCommandInteraction) {
    super(raw);
    this.commandId = raw.data.id;
    this.commandName = raw.data.name;
    this.member = raw.member ? new GuildMember(raw.member) : null;
    this.user = raw.member
      ? raw.member.user
        ? new User(raw.member.user)
        : null
      : null;
  }
}
