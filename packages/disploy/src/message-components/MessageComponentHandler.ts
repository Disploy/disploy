import type { BaseInteraction } from '../structs';
import type { ButtonInteraction } from '../structs/ButtonInteraction';

export interface BaseMessageComponentHandler {
	customId: string;
	run(interaction: BaseInteraction): void | Promise<void>;
}

export interface ButtonHandler extends BaseMessageComponentHandler {
	run(interaction: ButtonInteraction): void | Promise<void>;
}

export type MessageComponentHandler = ButtonHandler;
