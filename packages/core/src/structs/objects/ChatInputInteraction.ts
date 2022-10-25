import type {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponseCallbackData,
  Snowflake,
} from "discord-api-types/v10";
import type { ReplyHook } from "../ReplyHook";
import type { Rest } from "../rest";
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

  public constructor(
    replyHook: ReplyHook,
    rest: Rest,
    raw: APIChatInputApplicationCommandInteraction
  ) {
    super(replyHook, rest, raw);
    this.commandId = raw.data.id;
    this.commandName = raw.data.name;
    this.member = raw.member ? new GuildMember(raw.member) : null;
    this.user = raw.member
      ? raw.member.user
        ? new User(raw.member.user)
        : null
      : null;
  }

  // TODO: Make this an override of BaseInteraction#reply when it's implemented.
  // TODO: Take a response structure or json body
  public reply(payload: APIInteractionResponseCallbackData) {
    // TODO: Fetch reply if enabled in the arguments
    return void this.replyHook({
      type: 4,
      data: payload,
    });
  }
}
