import type {
	APIApplicationCommandInteractionDataBooleanOption,
	APIApplicationCommandInteractionDataChannelOption,
	APIApplicationCommandInteractionDataIntegerOption,
	APIApplicationCommandInteractionDataNumberOption,
	APIApplicationCommandInteractionDataOption,
	APIApplicationCommandInteractionDataStringOption,
	APIApplicationCommandInteractionDataUserOption,
} from 'discord-api-types/v10';
import type { App } from '../client';
import { Base } from './Base';
import type { BaseChannel } from './BaseChannel';
import type { ChatInputInteraction } from './ChatInputInteraction';
import { ChatInputInteractionResolvedOptions } from './ChatInputInteractionResolvedOptions';
import type { PartialGuildMember } from './PartialGuildMember';
import type { User } from './User';

export class ChatInputInteractionOptions extends Base {
	public resolved: ChatInputInteractionResolvedOptions;
	public constructor(app: App, private interaction: ChatInputInteraction) {
		super(app);
		this.resolved = new ChatInputInteractionResolvedOptions(this.interaction)
	}

	private getValue<T extends APIApplicationCommandInteractionDataOption>(key: string, nullable: boolean) {
		const value = this.interaction.raw.data.options?.find((option) => option.name === key) as T | undefined;

		if (!value && !nullable) {
			throw new Error(`Option "${key}" not found.`);
		}

		return value;
	}

	public getString(key: string): string;
	public getString(key: string, nullable: false): string;
	public getString(key: string, nullable: boolean): string | undefined;
	public getString(key: string, nullable = false): string | undefined {
		return this.getValue<APIApplicationCommandInteractionDataStringOption>(key, nullable)?.value;
	}

	public getNumber(key: string): number;
	public getNumber(key: string, nullable: false): number;
	public getNumber(key: string, nullable: boolean): number | undefined;
	public getNumber(key: string, nullable = false): number | undefined {
		return this.getValue<APIApplicationCommandInteractionDataNumberOption>(key, nullable)?.value;
	}

	public getInteger(key: string): number;
	public getInteger(key: string, nullable: false): number;
	public getInteger(key: string, nullable: boolean): number | undefined;
	public getInteger(key: string, nullable = false): number | undefined {
		return this.getValue<APIApplicationCommandInteractionDataIntegerOption>(key, nullable)?.value;
	}
	
	public getBoolean(key: string): boolean;
	public getBoolean(key: string, nullable: false): boolean;
	public getBoolean(key: string, nullable: boolean): boolean | undefined;
	public getBoolean(key: string, nullable = false): boolean | undefined {
		return this.getValue<APIApplicationCommandInteractionDataBooleanOption>(key, nullable)?.value;
	}

	public getUser(key: string): User;
	public getUser(key: string, nullable: false): User;
	public getUser(key: string, nullable: boolean): User | undefined;
	public getUser(key: string, nullable = false): User | undefined {
		return this.resolved.users.get(this.getValue<APIApplicationCommandInteractionDataUserOption>(key, nullable)?.value!)!
	}

	public getMember(key: string): PartialGuildMember;
	public getMember(key: string, nullable: false): PartialGuildMember;
	public getMember(key: string, nullable: boolean): PartialGuildMember | undefined;
	public getMember(key: string, nullable = false): PartialGuildMember | undefined {
		return this.resolved.members.get(this.getValue<APIApplicationCommandInteractionDataUserOption>(key, nullable)?.value!)!
	}

	public getChannel(key: string): BaseChannel;
	public getChannel(key: string, nullable: false): BaseChannel;
	public getChannel(key: string, nullable: boolean): BaseChannel | undefined;
	public getChannel(key: string, nullable = false): BaseChannel | undefined {
		return this.resolved.channels.get(this.getValue<APIApplicationCommandInteractionDataChannelOption>(key, nullable)?.value!)!
	}
}