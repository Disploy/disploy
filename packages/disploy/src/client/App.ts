/* eslint-disable turbo/no-undeclared-env-vars */
import { OptionalRestConfig, RequiredRestConfig, Rest } from '@disploy/rest';
import { Routes } from 'discord-api-types/v10';
import { Command, CommandManager } from '../commands';
import { MessageComponentHandler, MessageComponentManager } from '../message-components';
import { Router } from '../router';
import { ChannelManager, Guild, MessageManager, StructureManager, User } from '../structs';
import { ToBeFetched } from '../structs/ToBeFetched';
import { Logger, LoggerOptions } from '../utils';

export interface AppOptions {
	logger?: LoggerOptions;
	commands?: Command[];
	handlers?: MessageComponentHandler[];
	rest?: Omit<RequiredRestConfig, 'token'> & OptionalRestConfig;
	env?: Record<string, string>;
}

export interface StartAppOptions {
	publicKey: string | null;
	clientId: string;
	token: string;
}

const DefaultAppOptions: Required<AppOptions> = {
	logger: {
		debug: false,
	},
	commands: [],
	handlers: [],
	rest: {},
	env: {},
};

export class App {
	// Options
	private initOptions: Required<AppOptions>;
	public token: string = 'not-ready';
	public clientId: string = 'not-ready';
	public publicKey: string = 'not-ready';
	public env: Map<string, string> = new Map();

	// Managers
	public logger: Logger;
	public router: Router;
	public rest!: Rest;

	public users: StructureManager<User>;
	public guilds: StructureManager<Guild>;
	public channels: ChannelManager;
	public messages: MessageManager;

	// Handlers
	public commands: CommandManager;
	public handlers: MessageComponentManager;

	// Misc
	public user!: ToBeFetched<User>;

	public constructor(options?: AppOptions) {
		this.initOptions = { ...DefaultAppOptions, ...(options ?? {}) };

		this.logger = new Logger(this.initOptions.logger);
		this.initOptions.env && this._populateEnv(this.initOptions.env);
		// token, clientId & publicKey are set in start()

		// Managers
		this.router = new Router(this);
		// Rest is initialized in start()

		this.users = new StructureManager(this, User, (id) => this.rest.get(Routes.user(id)));
		this.guilds = new StructureManager(this, Guild, (id) => this.rest.get(Routes.guild(id)));
		this.channels = new ChannelManager(this);
		this.messages = new MessageManager(this);

		// Handlers
		this.commands = new CommandManager(this, this.initOptions.commands);
		this.handlers = new MessageComponentManager(this, this.initOptions.handlers);
	}

	public start(options: StartAppOptions): void {
		this.token = options.token;
		this.clientId = options.clientId;
		this.publicKey = options.publicKey ?? 'not-ready';

		// Managers
		this.rest = new Rest({ token: this.token, ...this.initOptions?.rest });
		this.rest.on('debug', (message) => this.logger.debug(message));

		// Misc
		this.user = new ToBeFetched(this, User, options.clientId, (id) => this.rest.get(Routes.user(id)));

		// Initialize
		this.router.start();

		this.logger.debug('App initialized.', {
			publicKey: options.publicKey,
			token: options.token.replace(/^(.{5}).*$/, '$1**********'),
			clientID: options.clientId,
		});
	}

	private _populateEnv(env: Record<string, string>) {
		for (const [key, value] of Object.entries(env)) {
			this.env.set(key, value);
		}
	}
}
