import type { REST } from '@discordjs/rest';
import {
	OptionalWebSocketManagerOptions,
	RequiredWebSocketManagerOptions,
	WebSocketManager,
	WebSocketShardEvents,
} from '@discordjs/ws';
import { GatewayDispatchEvents } from 'discord-api-types/v10';
import { App, Message } from 'disploy';
import EventEmitter from 'eventemitter3';
import type { GatewayEvents } from './types';

export class Gateway extends EventEmitter<GatewayEvents> {
	public ws: WebSocketManager;

	constructor(
		private readonly app: App,
		options: Omit<Partial<OptionalWebSocketManagerOptions> & RequiredWebSocketManagerOptions, 'token' | 'rest'>,
	) {
		super();
		this.ws = new WebSocketManager({ ...options, token: app.token, rest: app.rest as unknown as REST });
		this.applyHooks();
	}

	public async connect() {
		await this.ws.connect();
	}

	private applyHooks() {
		this.ws.on(WebSocketShardEvents.Dispatch, (packet) => {
			this.emit('raw', packet);

			switch (packet.data.t) {
				case GatewayDispatchEvents.MessageCreate:
					this.emit('message', new Message(this.app, packet.data.d));
					break;
			}
		});
	}
}
