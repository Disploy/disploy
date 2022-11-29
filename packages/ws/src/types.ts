import type { Message } from 'disploy';

export interface GatewayEvents {
	message: [Message];
	raw: [unknown];
}
