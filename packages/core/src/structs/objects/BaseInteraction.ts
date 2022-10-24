import type { APIInteraction, Snowflake } from "discord-api-types/v10";
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

  public constructor(client: Rest, raw: APIInteraction) {
    super(client);
    this.id = raw.id;
    this.token = raw.token;
  }
}
