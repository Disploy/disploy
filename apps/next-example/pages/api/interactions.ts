/* eslint-disable turbo/no-undeclared-env-vars */
import { ChatInputInteraction } from "@disploy/core";
import { App, ChatInputRoute, createNextAdapter } from "@disploy/framework";

const app = new App({
  clientID: process.env.CLIENT_ID!,
  publicKey: process.env.DISCORD_PUBLIC_KEY!,
  token: process.env.DISCORD_TOKEN!,
});

class PingCommand extends ChatInputRoute {
  public constructor() {
    super({ name: "ping" });
  }

  override async chatInputRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: "Pong!",
    });
  }
}

app.router.addRoute(new PingCommand());

export default createNextAdapter(app);
