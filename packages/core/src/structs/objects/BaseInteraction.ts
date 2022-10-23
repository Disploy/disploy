import type { APIInteraction, Snowflake } from "discord-api-types/v10";

export class BaseInteraction {
  /**
   * The ID of the interaction.
   */
  public id!: Snowflake;

  public constructor(raw: APIInteraction) {
    this.id = raw.id;
  }
}
