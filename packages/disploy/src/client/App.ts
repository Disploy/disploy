/* eslint-disable turbo/no-undeclared-env-vars */
import { Routes } from 'discord-api-types/v10';
import { Command, CommandManager } from '../commands';
import { Router } from '../router';
import { ChannelManager, Guild, StructureManager, User } from '../structs';
import { ToBeFetched } from '../structs/ToBeFetched';
import { Logger } from '../utils';
import type { AppOptions } from './AppOptions';
import { Rest } from './Rest';

export class App {
	public publicKey!: string;
	public clientId!: string;
	public router!: Router;
	public token!: string;
	public rest!: Rest;
	public logger!: Logger;
	public commands!: CommandManager;

	// Structure Managers
	public users!: StructureManager<User>;
	public guilds!: StructureManager<Guild>;
	public channels!: ChannelManager;

	// Misc
	public user!: ToBeFetched<User>;

	private _commandBuffer: Command[] = [];

	public constructor(options?: AppOptions) {
		this.logger = new Logger({
			debug: options?.logger?.debug ? true : false,
		});

		this._commandBuffer = options?.commands ?? [];
	}

	public start({
		publicKey,
		clientId,
		token,
		commands,
	}: {
		publicKey: string;
		clientId: string;
		token: string;
		commands?: Command[];
	}): void {
		// Required environment variables
		this.publicKey = publicKey;
		this.clientId = clientId;
		this.token = token;

		// Base Managers
		this.rest = new Rest({ token: this.token });
		this.router = new Router(this);

		// Structure Managers
		this.guilds = new StructureManager(this, Guild, (id) => this.rest.get(Routes.guild(id)));
		this.users = new StructureManager(this, User, (id) => this.rest.get(Routes.user(id)));
		this.channels = new ChannelManager(this);

		// Misc
		this.user = new ToBeFetched(this, User, () => this.rest.get(Routes.user(this.clientId)));

		// Command Framework

		this.commands = new CommandManager(this);

		this._commandBuffer.forEach((command) => {
			this.commands.registerCommand(command);
			this.logger.debug(`Registered command ${command.options.name} from buffer`);
		});

		this._commandBuffer = [];

		commands?.forEach((command) => {
			this.commands.registerCommand(command);
			this.logger.debug(`Registered command ${command.options.name} from start()`);
		});

		this.logger.debug('App initialized.', {
			publicKey: this.publicKey,
			token: this.token.replace(/^(.{5}).*$/, '$1**********'),
			clientID: this.clientId,
		});
	}
}
