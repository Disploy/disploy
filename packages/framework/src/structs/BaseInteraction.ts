import type { APIInteraction, Snowflake } from "discord-api-types/v10";
import type { App } from "../client";
import { SnowflakeUtil } from "../utils";
import { Base } from "./Base";

export class BaseInteraction extends Base {
  /**
   * The ID of the interaction.
   */
  public id!: Snowflake;

  /**
   * Timestamp of when the interaction was created.
   */
  public createdTimestamp!: number;

  /**
   * The token of the interaction.
   */
  public token!: string;

  public constructor(app: App, raw: APIInteraction) {
    super(app);
    this.id = raw.id;
    this.token = raw.token;
    this.createdTimestamp = SnowflakeUtil.toTimestamp(this.id);
  }
}
