import type { InteractionType } from "discord-api-types/v10";

export class BaseRoute {
  /**
   * The type of interaction this route is for.
   */
  public type!: InteractionType;
}
