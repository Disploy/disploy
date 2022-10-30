import { ChatInputRoute, type ChatInputInteraction } from "@disploy/framework";

export default class PingCommand extends ChatInputRoute {
  public constructor() {
    super({ name: "ping" });
  }

  override async chatInputRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: `Pong! ${Date.now() - interaction.createdTimestamp}ms`,
    });
  }
}
