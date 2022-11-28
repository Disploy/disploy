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

	private getValue<T extends APIApplicationCommandInteractionDataOption>(key: string, nullable: boolean) {
		const value = this.interaction.raw.data.options?.find((option) => option.name === key) as T | undefined;

		if (!value && !nullable) {
			throw new Error(`Option "${key}" not found.`);
		}

		return value;
	}

	public getString(key: string): string;
	public getString(key: string, nullable?: boolean): string | undefined;
	public getString(key: string, nullable = false): string | undefined {
		return this.getValue<APIApplicationCommandInteractionDataStringOption>(key, nullable)?.value;
	}

	public getNumber(key: string): number;
	public getNumber(key: string, nullable?: boolean): number | undefined;
	public getNumber(key: string, nullable = false): number | undefined {
		return this.getValue<APIApplicationCommandInteractionDataNumberOption>(key, nullable)?.value;
	}
}
