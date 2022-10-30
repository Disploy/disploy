import type { App } from "../client";
import { ChatInputRoute } from "../router";
import type { Command } from "./Command";

export class CommandManager {
  public constructor(private app: App) {}

  public registerCommand(command: Command) {
    this.app.router.addRoute(new ChatInputRoute(this.app, command));
  }
}
