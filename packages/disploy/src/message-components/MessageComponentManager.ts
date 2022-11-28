import type { App } from '../client';
import { MessageComponentRoute } from '../router';
import type { MessageComponentHandler } from './MessageComponentHandler';

export class MessageComponentManager {
	public constructor(private app: App) {}

	private readonly handlers = new Map<string, MessageComponentHandler>();

	/**
	 * Get the registered message component handlers for this manager
	 * @returns Registered handlers in this manager
	 */
	public getHandlers() {
		return this.handlers;
	}

	public registerHandler(handler: MessageComponentHandler) {
		this.app.router.addRoute(new MessageComponentRoute(this.app, handler));
		this.handlers.set(handler.customId, handler);
	}
}
