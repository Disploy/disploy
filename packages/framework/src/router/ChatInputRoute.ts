import { InteractionType } from "discord-api-types/v10";
import type { App } from "../client";
import type { Command } from "../commands";
import type { ChatInputInteraction } from "../structs";
import { RequestorError } from "../utils";
import { BaseRoute } from "./BaseRoute";

export class ChatInputRoute extends BaseRoute {
  public name!: string;

  public constructor(app: App, private command: Command) {
    super(app);
    this.type = InteractionType.ApplicationCommand;
    this.name = command.options.name;
  }

  public async chatInputRun(interaction: ChatInputInteraction) {
    if (!this.command.slashRun) {
      throw new RequestorError("Command does not have a slashRun method.");
    }

    this.command.slashRun(interaction);
  }
}
