import type { OptionalRestConfig, RequiredRestConfig } from '@disploy/rest';
import type { Command } from '../commands';
import type { MessageComponentHandler } from '../message-components';

export interface LoggerOptions {
	debug?: boolean;
}

export interface AppOptions {
	logger?: LoggerOptions;
	commands?: Command[];
	handlers?: MessageComponentHandler[];
	rest?: RequiredRestConfig & OptionalRestConfig;
	env?: Record<string, string>;
}
