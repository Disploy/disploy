import { App } from "@disploy/framework";
import { Commands } from "./commands";

/* eslint-disable turbo/no-undeclared-env-vars */ export class ExampleApp extends App {
  public constructor({
    clientID,
    publicKey,
    token,
  }: {
    clientID: string;
    publicKey: string;
    token: string;
  }) {
    super({
      clientID,
      publicKey,
      token,
      logger: {
        level: "debug",
      },
    });

    for (const command of Commands) {
      this.router.addRoute(new command());
      this.logger.info(`Registered command ${command.name}`);
    }
  }
}
