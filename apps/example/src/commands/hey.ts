import { Command, type ChatInputInteraction } from "@disploy/framework";

export default class HeyCommand extends Command {
  public constructor() {
    super({
      name: "hey",
      description: "heyy!",
    });
  }

  override async slashRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: `heyy! (from new command framework1!1) `,
    });
  }
}
