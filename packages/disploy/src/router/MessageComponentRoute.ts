import { InteractionType } from 'discord-api-types/v10';
import type { App } from '../client';
import type { MessageComponentHandler } from '../message-components';
import type { ButtonInteraction } from '../structs/ButtonInteraction';
import { RequestorError } from '../utils';
import { BaseRoute } from './BaseRoute';

export class MessageComponentRoute extends BaseRoute {
	public customId: string;

	public constructor(app: App, private handler: MessageComponentHandler) {
		super(app);
		this.type = InteractionType.MessageComponent;
		this.customId = handler.customId;
	}

	public async buttonRun(interaction: ButtonInteraction) {
		if (!this.handler.run) {
			throw new RequestorError('Message component handler does not have a run method.');
		}

		// The await is required here since the slashRun method *can* be async.
		// This ensures the route calls the finish event after the slashRun method is done.
		// This is important because serverless functions will end the process after the finish event is called.
		await this.handler.run(interaction);
	}
}
