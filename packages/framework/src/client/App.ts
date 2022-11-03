/* eslint-disable turbo/no-undeclared-env-vars */
import pino, { Logger } from "pino";
import { Command, CommandManager } from "../commands";
import { Router } from "../router";
import type { AppOptions } from "./AppOptions";
import { Rest } from "./Rest";

export class App {
  public publicKey!: string;
  public clientId!: string;
  public router!: Router;
  public token!: string;
  public rest!: Rest;
  public logger!: Logger;
  public commands!: CommandManager;

  private _commandBuffer: Command[] = [];

  public constructor(options?: AppOptions) {
    this.logger = pino({
      level: options?.logger?.level ?? "info",
    });

    this._commandBuffer = options?.commands ?? [];
  }

  public start({
    publicKey,
    clientId,
    token,
    commands,
  }: {
    publicKey: string;
    clientId: string;
    token: string;
    commands?: Command[];
  }): void {
    this.publicKey = publicKey;
    this.clientId = clientId;
    this.token = token;

    this.rest = new Rest({ token: this.token });
    this.router = new Router(this);
    this.commands = new CommandManager(this);

    this._commandBuffer.forEach((command) => {
      this.commands.registerCommand(command);
    });

    this._commandBuffer = [];

    commands?.forEach((command) => {
      this.commands.registerCommand(command);
    });

    this.logger.info(
      {
        publicKey: this.publicKey,
        token: this.token.replace(/^(.{5}).*$/, "$1**********"),
        clientID: this.clientId,
      },
      "App initialized."
    );
  }
}
