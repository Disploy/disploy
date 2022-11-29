import { GatewayChannelDeleteDispatch, GatewayDispatchEvents } from 'discord-api-types/v10';
import type { InternalEventHandler } from '../types';

export const ChannelDelete: InternalEventHandler<GatewayChannelDeleteDispatch> = {
	type: GatewayDispatchEvents.ChannelDelete,

	handle(packet, app, emit) {
		emit('channelDelete', app.channels.constructChannel(packet.data.d));
	},
};
