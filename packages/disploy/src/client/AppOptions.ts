import type { Command } from '../commands';
import type { MessageComponentHandler } from '../message-components';

export interface LoggerOptions {
	debug?: boolean;
}

export interface AppOptions {
	logger?: LoggerOptions;
	commands?: Command[];
	handlers?: MessageComponentHandler[];
}
