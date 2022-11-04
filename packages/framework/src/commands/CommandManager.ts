import {
  APIApplicationCommand,
  ApplicationCommandType,
  RESTGetAPIApplicationCommandsResult,
  RESTPatchAPIApplicationCommandJSONBody,
  RESTPatchAPIApplicationCommandResult,
  RESTPostAPIApplicationCommandsJSONBody,
  RESTPostAPIApplicationCommandsResult,
  Routes,
} from "discord-api-types/v10";
import type { App } from "../client";
import { ChatInputRoute } from "../router";
import type { Command } from "./Command";

export class CommandManager {
  public constructor(private app: App) {}

  private readonly commands = new Map<string, Command>();

  public registerCommand(command: Command) {
    this.app.router.addRoute(new ChatInputRoute(this.app, command));
    this.commands.set(command.options.name, command);
  }

  /**
   * Sync all registered commands with the DAPI
   * @param guildId Guild ID to sync commands for
   */
  public async syncCommands(guildId?: string) {
    const existingCommands = await this.getRegisteredCommands({
      guildId,
      onlyFramework: true,
    });

    const commandsToUpdate = this.filterExistingCommands(existingCommands);

    this.app.logger.debug(
      `Found ${commandsToUpdate.length} commands to update!`,
      commandsToUpdate
    );

    const commandsToRegister =
      this.filterNonFrameworkCommands(existingCommands);

    this.app.logger.debug(
      `Found ${commandsToRegister.length} commands to register!`,
      commandsToRegister
    );

    for (const command of commandsToRegister) {
      await this.registerCommandToDiscord(command, guildId);
    }

    for (const [command, existingCommand] of commandsToUpdate) {
      await this.updateCommandOnDiscord(existingCommand.id, command, guildId);
    }
  }

  /**
   * Get all registered command on the DAPI for this application
   * @returns Registered commands for this application on Discord
   * @param options Options for the request
   */
  public async getRegisteredCommands(options?: {
    guildId?: string;
    onlyFramework?: boolean;
  }): Promise<RESTGetAPIApplicationCommandsResult> {
    const commands =
      await this.app.rest.get<RESTGetAPIApplicationCommandsResult>(
        options?.guildId
          ? Routes.applicationGuildCommands(this.app.clientId, options.guildId)
          : Routes.applicationCommands(this.app.clientId)
      );

    if (options?.onlyFramework) {
      return commands.filter((command) => this.commands.has(command.name));
    }

    return commands;
  }

  private filterExistingCommands(
    existingCommands: RESTGetAPIApplicationCommandsResult
  ) {
    const commandsToUpdate: [Command, APIApplicationCommand][] = [];

    for (const command of existingCommands) {
      const localCommand = this.commands.get(command.name);
      if (!localCommand) continue;

      if (!this.areCommandsEqual(localCommand, command)) {
        commandsToUpdate.push([localCommand, command]);
      }
    }

    return commandsToUpdate;
  }

  private filterNonFrameworkCommands(
    existingCommands: RESTGetAPIApplicationCommandsResult
  ) {
    return [...this.commands.values()].filter(
      (command) =>
        !existingCommands.find((c) => c.name === command.options.name)
    );
  }

  private async registerCommandToDiscord(command: Command, guildId?: string) {
    const route = guildId
      ? Routes.applicationGuildCommands(this.app.clientId, guildId)
      : Routes.applicationCommands(this.app.clientId);

    const response = await this.app.rest.post<
      RESTPostAPIApplicationCommandsJSONBody,
      RESTPostAPIApplicationCommandsResult
    >(route, command.toJson());

    this.app.logger.debug(
      `Registered command ${command.options.name}!`,
      response
    );
  }

  private async updateCommandOnDiscord(
    id: string,
    command: Command,
    guildId?: string
  ) {
    const route = guildId
      ? Routes.applicationGuildCommand(this.app.clientId, guildId, id)
      : Routes.applicationCommand(this.app.clientId, id);

    const response = await this.app.rest.patch<
      RESTPatchAPIApplicationCommandJSONBody,
      RESTPatchAPIApplicationCommandResult
    >(route, command.toJson());

    this.app.logger.debug(`Updated command ${command.options.name}!`, response);
  }

  private areCommandsEqual(
    command: Command,
    existingCommand: APIApplicationCommand
  ) {
    // Disploy only has ChatInput commands for now
    if (existingCommand.type !== ApplicationCommandType.ChatInput) return false;

    const { options } = command.options;
    const { options: existingOptions } = existingCommand;

    if (existingCommand.description !== command.options.description)
      return false;

    for (const option of options ?? []) {
      const existingOption = existingOptions?.find(
        (o) => o.name === option.name
      );

      if (!existingOption) return false;

      if (existingOption.description !== option.description) return false;

      if (existingOption.type !== option.type) return false;

      if (existingOption.required !== option.required) return false;
    }

    return true;
  }
}
