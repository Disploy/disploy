import type { InteractionType } from "@disploy/core";

export class BaseRoute {
  /**
   * The type of interaction this route is for.
   */
  public type!: InteractionType;
}
