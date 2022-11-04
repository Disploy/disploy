import type {
	APIApplicationCommandInteractionDataNumberOption,
	APIApplicationCommandInteractionDataOption,
	APIApplicationCommandInteractionDataStringOption,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';
import type { ChatInputInteraction } from './ChatInputInteraction';

export class ChatInputInteractionOptions extends Base {
	public constructor(app: App, private interaction: ChatInputInteraction) {
		super(app);
	}

	private getValue<T extends APIApplicationCommandInteractionDataOption>(key: string) {
		const value = this.interaction.raw.data.options?.find((option) => option.name === key) as T | undefined;

		if (!value) {
			throw new Error(`Option "${key}" not found.`);
		}

		return value;
	}

	public getString(key: string) {
		return this.getValue<APIApplicationCommandInteractionDataStringOption>(key).value;
	}

	public getNumber(key: string) {
		return this.getValue<APIApplicationCommandInteractionDataNumberOption>(key).value;
	}
}
