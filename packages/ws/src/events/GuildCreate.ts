import { GatewayDispatchEvents, GatewayGuildCreateDispatch } from 'discord-api-types/v10';
import { Guild } from 'disploy';
import type { InternalEventHandler } from '../types';

export const GuildCreate: InternalEventHandler<GatewayGuildCreateDispatch> = {
	type: GatewayDispatchEvents.GuildCreate,

	handle(packet, app, emit) {
		emit('guildCreate', new Guild(app, packet.data.d));
	},
};
