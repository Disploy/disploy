import type {
	APIApplicationCommandInteractionDataChannelOption,
	APIApplicationCommandInteractionDataNumberOption,
	APIApplicationCommandInteractionDataOption,
	APIApplicationCommandInteractionDataStringOption,
	APIApplicationCommandInteractionDataUserOption,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';
import type { ChatInputInteraction } from './ChatInputInteraction';
import { ChatInputInteractionResolvedOptions } from './ChatInputInteractionResolvedOptions';

export class ChatInputInteractionOptions extends Base {
	public resolved: ChatInputInteractionResolvedOptions;
	public constructor(app: App, private interaction: ChatInputInteraction) {
		super(app, interaction.raw.data.options);
		this.resolved = new ChatInputInteractionResolvedOptions(this.interaction)
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
	public getUser(key: string) {
		return this.resolved.users.get(this.getValue<APIApplicationCommandInteractionDataUserOption>(key).value)!
	}
	public getMember(key: string) {
		return this.resolved.members.get(this.getValue<APIApplicationCommandInteractionDataUserOption>(key).value)!
	}
	public getChannel(key: string) {
		return this.resolved.users.get(this.getValue<APIApplicationCommandInteractionDataChannelOption>(key).value)!
	}

}
