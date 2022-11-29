import type { GatewayDispatchEvents, GatewayDispatchPayload } from 'discord-api-types/v10';
import type { App, Guild, Message } from 'disploy';
import type { Gateway } from './Gateway';

export interface GatewayEvents {
	messageCreate: [Message];
	guildCreate: [Guild];
	raw: [unknown];
}

export enum GatewayStatus {
	Connecting = 'CONNECTING',
	Connected = 'CONNECTED',
	Disconnected = 'DISCONNECTED',
}

export interface InternalEventHandler<T extends GatewayDispatchPayload> {
	type: GatewayDispatchEvents;
	handle(
		packet: {
			data: T;
		} & {
			shardId: number;
		},
		app: App,
		emit: Gateway['emit'],
	): void;
}
