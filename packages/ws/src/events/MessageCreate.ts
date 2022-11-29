import { GatewayDispatchEvents, GatewayMessageCreateDispatch } from 'discord-api-types/v10';
import { Message } from 'disploy';
import type { InternalEventHandler } from '../types';

export const MessageCreate: InternalEventHandler<GatewayMessageCreateDispatch> = {
	type: GatewayDispatchEvents.MessageCreate,

	handle(packet, app, emit) {
		emit('messageCreate', new Message(app, packet.data.d));
	},
};
