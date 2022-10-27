import { App } from "@disploy/framework";
import { Commands } from "./commands";

/* eslint-disable turbo/no-undeclared-env-vars */
export const ExampleApp = new App({
  clientID: process.env.CLIENT_ID!,
  publicKey: process.env.DISCORD_PUBLIC_KEY!,
  token: process.env.DISCORD_TOKEN!,
});

for (const command of Commands) {
  ExampleApp.router.addRoute(new command());
  ExampleApp.logger.info(`Registered command ${command.name}`);
}
