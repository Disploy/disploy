import { GatewayDispatchEvents, GatewayGuildMemberRemoveDispatch } from 'discord-api-types/v10';
import { PartialGuildMember } from 'disploy';
import type { InternalEventHandler } from '../types';

export const GuildMemberRemove: InternalEventHandler<GatewayGuildMemberRemoveDispatch> = {
	type: GatewayDispatchEvents.GuildMemberRemove,

	handle(packet, app, emit) {
		emit('guildMemberRemove', new PartialGuildMember(app, packet.data.d));
	},
};
