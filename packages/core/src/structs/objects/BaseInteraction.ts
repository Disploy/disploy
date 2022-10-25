import type { APIInteraction, Snowflake } from "discord-api-types/v10";
import type { ReplyHook } from "../ReplyHook";
import type { Rest } from "../rest";
import { Base } from "./Base";

export class BaseInteraction extends Base {
  /**
   * The ID of the interaction.
   */
  public id!: Snowflake;

  /**
   * The token of the interaction.
   */
  public token!: string;

  public constructor(replyHook: ReplyHook, rest: Rest, raw: APIInteraction) {
    super(replyHook, rest);
    this.id = raw.id;
    this.token = raw.token;
  }
}
