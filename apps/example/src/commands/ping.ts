import type { ChatInputInteraction } from "@disploy/core";
import { ChatInputRoute } from "@disploy/framework";

export default class PingCommand extends ChatInputRoute {
  public constructor() {
    super({ name: "ping" });
  }

  override async chatInputRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: "Pong!",
    });
  }
}
