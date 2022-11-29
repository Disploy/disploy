import type { REST } from '@discordjs/rest';
import type { DiscordGatewayAdapterCreator, DiscordGatewayAdapterLibraryMethods } from '@discordjs/voice';
import {
	OptionalWebSocketManagerOptions,
	RequiredWebSocketManagerOptions,
	WebSocketManager,
	WebSocketShardEvents,
} from '@discordjs/ws';
import { GatewayDispatchEvents } from 'discord-api-types/v10';
import type { App } from 'disploy';
import EventEmitter from 'eventemitter3';
import LoadEvents from './events/_loader';
import { GatewayEvents, GatewayStatus } from './types';
export class Gateway extends EventEmitter<GatewayEvents> {
	public ws: WebSocketManager;
	public status: GatewayStatus = GatewayStatus.Disconnected;

	private voiceAdapters: Map<string, DiscordGatewayAdapterLibraryMethods> = new Map();

	/**
	 * ## Gateway extension for Disploy
	 *
	 * Includes an event emitter with abstracted and raw events and a voice adapter for `@discordjs/voice`.
	 *
	 * @usage ```ts
	 * app.start(...)
	 *
	 * const gateway = new Gateway(app, {
	 *	intents: GatewayIntentBits.MessageContent | GatewayIntentBits.GuildMessages,
	 *});
	 *
	 * gateway.on(...)
	 *
	 * gateway.connect();
	 *```
	 */
	constructor(
		public readonly app: App,
		options: Omit<Partial<OptionalWebSocketManagerOptions> & RequiredWebSocketManagerOptions, 'token' | 'rest'>,
	) {
		super();
		this.ws = new WebSocketManager({ ...options, token: app.token, rest: app.rest as unknown as REST });
		this.applyHooks();
	}

	public async connect() {
		this.status = GatewayStatus.Connecting;
		await this.ws.connect();
	}

	private applyHooks() {
		LoadEvents(this);

		this.ws.on(WebSocketShardEvents.Ready, () => {
			this.status = GatewayStatus.Connected;
		});

		this.ws.on(WebSocketShardEvents.Dispatch, (packet) => {
			this.emit('raw', packet);

			switch (packet.data.t) {
				case GatewayDispatchEvents.VoiceServerUpdate: {
					if (!packet.data.d.guild_id) break;

					if (this.voiceAdapters.has(packet.data.d.guild_id)) {
						this.voiceAdapters.get(packet.data.d.guild_id)?.onVoiceServerUpdate(packet.data.d);
					}
					break;
				}
				case GatewayDispatchEvents.VoiceStateUpdate: {
					if (!packet.data.d.guild_id) break;

					if (this.voiceAdapters.has(packet.data.d.guild_id)) {
						this.voiceAdapters.get(packet.data.d.guild_id)?.onVoiceStateUpdate(packet.data.d);
					}
					break;
				}
			}
		});
	}

	/**
	 *  Create a `@discordjs/voice` for the Disploy Gateway extension.
	 * @param guildId The guild's id this adapter is for
	 * @returns a `@discordjs/voice` for the Disploy Gateway extension.
	 */
	public createVoiceAdapter(guildId: string): DiscordGatewayAdapterCreator {
		return (methods) => {
			this.voiceAdapters.set(guildId, methods);

			return {
				sendPayload: (payload) => {
					if (this.status !== GatewayStatus.Connected) return false;

					const shardId = 0;
					this.ws.send(shardId, payload);
					return true;
				},
				destroy: () => {
					this.voiceAdapters.delete(guildId);
				},
			};
		};
	}
}
