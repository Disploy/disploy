import type {
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponseCallbackData,
  Snowflake,
} from "discord-api-types/v10";
import type { App } from "../client";
import { BaseInteraction } from "./BaseInteraction";
import { ChatInputInteractionOptions } from "./ChatInputInteractionOptions";
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
   * The options of the interaction.
   */
  public options!: ChatInputInteractionOptions;

  /**
   * The GuildMember who invoked the interaction.
   */
  public member!: GuildMember | null;

  /**
   * The User who invoked the interaction.
   */
  public user!: User | null;

  public constructor(
    app: App,
    public raw: APIChatInputApplicationCommandInteraction
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
    this.options = new ChatInputInteractionOptions(app, this);
  }

  public reply(payload: APIInteractionResponseCallbackData) {
    return void this.app.router.emit(`${this.id}-respond`, {
      type: 4,
      data: payload,
    });
  }
}
