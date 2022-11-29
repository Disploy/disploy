import { WebSocketShardEvents } from '@discordjs/ws';
import type { GatewayDispatchEvents } from 'discord-api-types/v10';
import type { Gateway } from '../Gateway';
import type { InternalEventHandler } from '../types';
import { GuildCreate } from './GuildCreate';
import { MessageCreate } from './MessageCreate';

const Events: InternalEventHandler<any>[] = [
	MessageCreate,
	GuildCreate,
	//
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
