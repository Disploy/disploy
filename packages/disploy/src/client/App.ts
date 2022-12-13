/* eslint-disable turbo/no-undeclared-env-vars */
import { Rest } from '@disploy/rest';
import { Routes } from 'discord-api-types/v10';
import { Command, CommandManager } from '../commands';
import { MessageComponentHandler, MessageComponentManager } from '../message-components';
import { Router } from '../router';
import { ChannelManager, Guild, MessageManager, StructureManager, User } from '../structs';
import { ToBeFetched } from '../structs/ToBeFetched';
import { Logger } from '../utils';
import type { AppOptions } from './AppOptions';

export class App {
	public publicKey!: string | null;
	public clientId!: string;
	public router!: Router;
	public token!: string;
	public rest!: Rest;
	public logger!: Logger;
	public commands!: CommandManager;
	public handlers!: MessageComponentManager;

	// Structure Managers
	public users!: StructureManager<User>;
	public guilds!: StructureManager<Guild>;
	public channels!: ChannelManager;
	public messages!: MessageManager;

	// Misc
	public user!: ToBeFetched<User>;
	public env: Record<string, string> = {};

	private _commandBuffer: Command[] = [];
	private _handlerBuffer: MessageComponentHandler[] = [];

	public constructor(private options?: AppOptions) {
		this.logger = new Logger({
			debug: options?.logger?.debug ? true : false,
		});

		this._commandBuffer = options?.commands ?? [];
		this._handlerBuffer = options?.handlers ?? [];
		this.env = options?.env ?? {};
	}

	private _loadCommands(commands: Command[] | undefined) {
		const toLoad = [...this._commandBuffer, ...(commands ?? [])];

		for (const handler of toLoad) {
			this.commands.registerCommand(handler);
			this.logger.debug(`Registered command ${handler.name}`);
		}
	}

	private _loadHandlers(handlers: MessageComponentHandler[] | undefined) {
		const toLoad = [...this._handlerBuffer, ...(handlers ?? [])];

		for (const handler of toLoad) {
			this.handlers.registerHandler(handler);
			this.logger.debug(`Registered handler ${handler.customId}`);
		}
	}

	public start({
		publicKey,
		clientId,
		token,
		commands,
		handlers,
		env,
	}: {
		publicKey: string | null;
		clientId: string;
		token: string;
		commands?: Command[];
		handlers?: MessageComponentHandler[];
		env?: Record<string, string>;
	}): void {
		// Required environment variables
		this.publicKey = publicKey;
		this.clientId = clientId;
		this.token = token;

		// Base Managers
		this.rest = new Rest({ token: this.token, ...this.options?.rest });
		this.rest.on('debug', (message) => this.logger.debug(message));
		this.router = new Router(this);

		// Structure Managers
		this.guilds = new StructureManager(this, Guild, (id) => this.rest.get(Routes.guild(id)));
		this.users = new StructureManager(this, User, (id) => this.rest.get(Routes.user(id)));
		this.channels = new ChannelManager(this);
		this.messages = new MessageManager(this);

		// Misc
		this.user = new ToBeFetched(this, User, this.clientId, (id) => this.rest.get(Routes.user(id)));
		this.env = this.env ? { ...this.env, ...env } : env ?? {};

		// Command Framework

		this.commands = new CommandManager(this);
		this.handlers = new MessageComponentManager(this);

		this._loadCommands(commands);
		this._loadHandlers(handlers);

		this.logger.debug('App initialized.', {
			publicKey: this.publicKey,
			token: this.token.replace(/^(.{5}).*$/, '$1**********'),
			clientID: this.clientId,
		});
	}
}
