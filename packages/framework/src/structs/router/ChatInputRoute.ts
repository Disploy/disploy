import { ChatInputInteraction, InteractionType } from "@disploy/core";
import { BaseRoute } from "./BaseRoute";

export interface ChatInputRouteOptions {
  /**
   * The name of the command.
   */
  name: string;
}

export class ChatInputRoute extends BaseRoute {
  public name!: string;

  public constructor(options: ChatInputRouteOptions) {
    super();
    this.type = InteractionType.ApplicationCommand;
    this.name = options.name;
  }

  // @ts-expect-error 6133
  public async chatInputRun(interaction: ChatInputInteraction) {
    return void 0;
  }
}
