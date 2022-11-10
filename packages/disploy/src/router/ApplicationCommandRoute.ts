import { InteractionType } from 'discord-api-types/v10';
import type { App } from '../client';
import type { ApplicationCommand } from '../commands';
import type { CommandInteraction } from '../structs/CommandInteraction';
import { RequestorError } from '../utils';
import { BaseRoute } from './BaseRoute';

export class ApplicationCommandRoute extends BaseRoute {
	public name: string;

	public constructor(app: App, private command: ApplicationCommand) {
		super(app);
		this.type = InteractionType.ApplicationCommand;
		this.name = command.name;
	}

	public async chatInputRun(interaction: CommandInteraction) {
		if (!this.command.run) {
			throw new RequestorError('Command does not have a run method.');
		}

		// The await is required here since the slashRun method *can* be async.
		// This ensures the route calls the finish event after the slashRun method is done.
		// This is important because serverless functions will end the process after the finish event is called.
		await this.command.run(interaction);
	}
}
