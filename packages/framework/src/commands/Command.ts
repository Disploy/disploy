import type {
	APIApplicationCommandOption,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord-api-types/v10';
import type { ChatInputInteraction } from '../structs';

export interface DisploySlash {
	name: string;
	description: string;
	options?: APIApplicationCommandOption[];
}

export class Command {
	public constructor(public options: DisploySlash) {}

	public slashRun?(interaction: ChatInputInteraction): void;

	public toJson(): RESTPostAPIChatInputApplicationCommandsJSONBody {
		return {
			name: this.options.name,
			description: this.options.description,
			options: this.options.options,
		};
	}
}
