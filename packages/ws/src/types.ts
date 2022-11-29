import type { GatewayDispatchEvents, GatewayDispatchPayload } from 'discord-api-types/v10';
import type { App, DiscordChannel, Guild, Message } from 'disploy';
import type { Gateway } from './Gateway';

export interface GatewayEvents {
	raw: [unknown];

	messageCreate: [Message];
	guildCreate: [Guild];
	channelCreate: [DiscordChannel];
	channelDelete: [DiscordChannel];
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
