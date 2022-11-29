import type { GatewayDispatchEvents, GatewayDispatchPayload } from 'discord-api-types/v10';
import type { App, DiscordChannel, Guild, GuildMember, Message } from 'disploy';
import type { Gateway } from './Gateway';

export interface GatewayEvents {
	raw: [unknown];

	messageCreate: [Message];
	guildCreate: [Guild];
	channelCreate: [DiscordChannel];
	channelDelete: [DiscordChannel];
	// TODO: Implement some sort of caching so that we can emit the guild before deletion
	guildDelete: [string];
	guildMemberAdd: [GuildMember];
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
