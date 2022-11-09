import { InteractionType } from 'discord-api-types/v10';
import type { App } from '../client';
import type { Command } from '../commands';
import type { ChatInputInteraction } from '../structs';
import { RequestorError } from '../utils';
import { BaseRoute } from './BaseRoute';

export class ChatInputRoute extends BaseRoute {
	public name!: string;

	public constructor(app: App, private command: Command) {
		super(app);
		this.type = InteractionType.ApplicationCommand;
		this.name = command.options.name;
	}

	public async chatInputRun(interaction: ChatInputInteraction) {
		if (!this.command.slashRun) {
			throw new RequestorError('Command does not have a slashRun method.');
		}

		// The await is required here since the slashRun method *can* be async.
		// This ensures the route calls the finish event after the slashRun method is done.
		// This is important because serverless functions will end the process after the finish event is called.
		await this.command.slashRun(interaction);
	}
}
