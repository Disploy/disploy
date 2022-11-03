import { Command, type ChatInputInteraction } from "@disploy/framework";
import { testImportVar } from "../lib/test";

export default class PingCommand extends Command {
  public constructor() {
    super({
      name: "ping",
      description: "pong!",
    });
  }

  override async slashRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: `${testImportVar}`,
    });
  }
}
