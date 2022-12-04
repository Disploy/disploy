import { GatewayChannelCreateDispatch, GatewayDispatchEvents } from 'discord-api-types/v10';
import type { InternalEventHandler } from '../types';

export const ChannelCreate: InternalEventHandler<GatewayChannelCreateDispatch> = {
	type: GatewayDispatchEvents.ChannelCreate,

	handle(packet, app, emit) {
		emit('channelCreate', app.channels.constructChannel(packet.data.d));
	},
};
