import { Rest } from "@disploy/core";
import pino, { Logger } from "pino";
import type { AppOptions } from "./AppOptions";
import { Router } from "./router/Router";

export class App {
  public publicKey!: string;
  public clientID!: string;
  public router!: Router;
  public token!: string;
  public rest!: Rest;
  public logger!: Logger;

  public constructor(options: AppOptions) {
    this.logger = pino({
      level: options.logger?.level ?? "info",
    });

    this.publicKey = options.publicKey;
    this.token = options.token;
    this.clientID = options.clientID;

    this.rest = new Rest({ token: this.token });
    this.router = new Router(this);

    this.logger.info(
      {
        publicKey: this.publicKey,
        token: this.token.replace(/^(.{5}).*$/, "$1**********"),
        clientID: this.clientID,
      },
      "App initialized."
    );
  }
}
