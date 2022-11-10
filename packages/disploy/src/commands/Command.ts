import type { APIApplicationCommandOption, ApplicationCommandType } from 'discord-api-types/v10';
import type { ChatInputInteraction } from '../structs';
import type { CommandInteraction } from '../structs/CommandInteraction';
import type { MessageContextMenuInteraction } from '../structs/MessageContextMenuInteraction';
import type { UserContextMenuInteraction } from '../structs/UserContextMenuInteraction';

export interface ApplicationCommand {
	name: string;
	type?: ApplicationCommandType;
	run(interaction: CommandInteraction): void | Promise<void>;
}

export interface SlashCommand extends ApplicationCommand {
	description: string;
	options?: APIApplicationCommandOption[];
	type?: ApplicationCommandType.ChatInput;
	run(interaction: ChatInputInteraction): void | Promise<void>;
}

export interface MessageContextMenuCommand extends ApplicationCommand {
	type: ApplicationCommandType.Message;
	run(interaction: MessageContextMenuInteraction): void | Promise<void>;
}

export interface UserContextMenuCommand extends ApplicationCommand {
	type: ApplicationCommandType.User;
	run(interaction: UserContextMenuInteraction): void | Promise<void>;
}

export type ContextMenuCommand = UserContextMenuCommand | MessageContextMenuCommand;

export type Command = SlashCommand | ContextMenuCommand;
