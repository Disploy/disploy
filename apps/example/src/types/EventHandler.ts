import type { GatewayEvents } from '@disploy/ws';

export interface EventHandler<T extends keyof GatewayEvents> {
	event: T;
	handle: (...args: GatewayEvents[T]) => void;
}
