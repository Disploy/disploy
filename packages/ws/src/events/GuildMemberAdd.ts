import { GatewayDispatchEvents, GatewayGuildMemberAddDispatch } from 'discord-api-types/v10';
import { GuildMember } from 'disploy';
import type { InternalEventHandler } from '../types';

export const GuildMemberAdd: InternalEventHandler<GatewayGuildMemberAddDispatch> = {
	type: GatewayDispatchEvents.GuildMemberAdd,

	handle(packet, app, emit) {
		emit('guildMemberAdd', new GuildMember(app, packet.data.d));
	},
};
