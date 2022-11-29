import { GatewayDispatchEvents, GatewayGuildDeleteDispatch } from 'discord-api-types/v10';
import type { InternalEventHandler } from '../types';

export const GuildDelete: InternalEventHandler<GatewayGuildDeleteDispatch> = {
	type: GatewayDispatchEvents.GuildDelete,

	handle(packet, _app, emit) {
		emit('guildDelete', packet.data.d.id);
	},
};
