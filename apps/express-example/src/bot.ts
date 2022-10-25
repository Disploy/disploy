/* eslint-disable turbo/no-undeclared-env-vars */
import type { ChatInputInteraction } from "@disploy/core";
import { App, ChatInputRoute, expressAdapter } from "@disploy/framework";
import bodyParser from "body-parser";
import express from "express";

const server = express();
server.use(bodyParser.json());

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

expressAdapter(app, server);

server.listen(4000, () => {
  console.log("🚀 Express server is running on port 4000");
});
