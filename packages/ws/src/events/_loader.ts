import { WebSocketShardEvents } from '@discordjs/ws';
import type { GatewayDispatchEvents } from 'discord-api-types/v10';
import type { Gateway } from '../Gateway';
import type { InternalEventHandler } from '../types';
import { ChannelCreate } from './ChannelCreate';
import { ChannelDelete } from './ChannelDelete';
import { GuildCreate } from './GuildCreate';
import { GuildDelete } from './GuildDelete';
import { GuildMemberAdd } from './GuildMemberAdd';
import { GuildMemberRemove } from './GuildMemberRemove';
import { MessageCreate } from './MessageCreate';

const Events: InternalEventHandler<any>[] = [
	MessageCreate,
	GuildCreate,
	ChannelCreate,
	ChannelDelete,
	GuildDelete,
	GuildMemberAdd,
	GuildMemberRemove,
];

export default function (gateway: Gateway) {
	const typeToHandler = new Map<GatewayDispatchEvents, InternalEventHandler<any>>();

	for (const event of Events) {
		typeToHandler.set(event.type, event);
	}

	gateway.ws.on(WebSocketShardEvents.Dispatch, (p) =>
		typeToHandler.get(p.data.t)?.handle(p, gateway.app, gateway.emit.bind(gateway)),
	);
}
