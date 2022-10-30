import { Command, type ChatInputInteraction } from "@disploy/framework";

export default class PingCommand extends Command {
  public constructor() {
    super({
      name: "ping",
      description: "pong!",
    });
  }

  override async slashRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: `Pong! (from new command framework1!1)`,
    });
  }
}
