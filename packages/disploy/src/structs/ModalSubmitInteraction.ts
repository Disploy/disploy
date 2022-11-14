import { BaseInteraction } from './BaseInteraction';
import type { APIModalSubmitInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { ActionRow } from './ActionRow';
import { ModalSubmitComponent } from './ModalSubmitComponent';
import {APIInteractionResponseCallbackData, InteractionResponseType} from "discord-api-types/v10";
import {RouterEvents} from "../router";

export class ModalSubmitInteraction extends BaseInteraction {
	public customId: string;
	public components: ActionRow[];

	public reply(payload: APIInteractionResponseCallbackData) {
		return void this.app.router.emit(RouterEvents.Respond(this.id), {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: payload,
		});
	}

	public constructor(app: App, raw: APIModalSubmitInteraction) {
		super(app, raw);
		this.customId = raw.data.custom_id;
		this.components = raw.data.components.map((rawActionRow) => {
			return new ActionRow().setComponents(
				rawActionRow.components.map((rawModalSubmitComponent) => {
					return new ModalSubmitComponent(rawModalSubmitComponent);
				}),
			);
		});
	}
}
