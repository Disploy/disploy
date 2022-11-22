import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIInteraction,
	APIMessageApplicationCommandInteraction,
	APIMessageComponentButtonInteraction,
	APIMessageComponentInteraction,
	APIUserApplicationCommandInteraction,
	ApplicationCommandType,
	ComponentType,
	InteractionType,
} from 'discord-api-types/v10';
import EventEmitter from 'eventemitter3';
import type { App } from '../client';
import { TResponse, type TRequest } from '../http';
import { ChatInputInteraction } from '../structs';
import { ButtonInteraction } from '../structs/ButtonInteraction';
import { MessageContextMenuInteraction } from '../structs/MessageContextMenuInteraction';
import { UserContextMenuInteraction } from '../structs/UserContextMenuInteraction';
import { DiscordAPIUtils, RequestorError, RuntimeConstants, Verify, VerifyCFW, VerifyNode } from '../utils';
import type { ApplicationCommandRoute } from './ApplicationCommandRoute';
import type { BaseRoute } from './BaseRoute';
import type { MessageComponentRoute } from './MessageComponentRoute';
import { RouterEvents } from './RouterEvents';

export class Router extends EventEmitter {
	private routes: BaseRoute[] = [];
	private verifier: Verify | null = null;
	private app!: App;

	public constructor(app: App) {
		super();
		this.app = app;
		if (this.app.publicKey) {
			this.verifier = RuntimeConstants.isNode ? new VerifyNode(this.app.publicKey) : new VerifyCFW(this.app.publicKey);
		}
	}

	public addRoute(route: BaseRoute) {
		this.routes.push(route);
	}

	private async verifyRequest(req: TRequest) {
		if (!this.verifier) {
			this.app.logger.warn('No public key provided, skipping verification.');
			return true;
		}

		const signature = req.headers['x-signature-ed25519'] as string;
		const timestamp = req.headers['x-signature-timestamp'] as string;

		if (!(await this.verifier.verify(JSON.stringify(req.body), signature, timestamp))) {
			throw new RequestorError('Invalid request signature.', 401);
		}

		return true;
	}

	public async entry(req: TRequest): Promise<TResponse> {
		const res = new TResponse();

		try {
			const handledResult = await this.handle(req, res);
			return handledResult;
		} catch (err: any) {
			switch (err.constructor) {
				case RequestorError:
					return res.status(err.status).json({
						message: err.message,
					});
				default:
					this.app.logger.error('An error occurred while handling a request.', err);
					return res.status(500).json({
						message: 'Internal server error.',
					});
			}
		}
	}

	private routeResolver(payload: APIInteraction) {
		switch (payload.type) {
			case InteractionType.ApplicationCommand:
				return this.routes.find(
					(route) =>
						route.type === InteractionType.ApplicationCommand &&
						(route as ApplicationCommandRoute).name ===
							(payload as APIChatInputApplicationCommandInteraction).data.name,
				);
			case InteractionType.MessageComponent:
				return this.routes.find(
					(route) =>
						route.type === InteractionType.MessageComponent &&
						(route as MessageComponentRoute).customId === (payload as APIMessageComponentInteraction).data.custom_id,
				);

			default:
				return void 0;
		}
	}

	private async handle(req: TRequest, res: TResponse): Promise<TResponse> {
		await this.verifyRequest(req);

		if (req.body.type === 1) {
			this.app.logger.debug('Received a ping request, responding back!');
			return res.status(200).json({
				type: 1,
			});
		}

		const route = this.routeResolver(req.body);

		if (!route) {
			this.app.logger.warn('No route found for interaction.', req.body);
			throw new RequestorError('No route found for this interaction.', 404);
		}

		const body = req.body as APIInteraction;

		const promise = new Promise<unknown>((resolve) => {
			this.on(RouterEvents.Respond(body.id), (res: unknown) => {
				resolve(res);
			});
		});

		switch (route.type) {
			case InteractionType.ApplicationCommand: {
				const chatInputRoute = route as ApplicationCommandRoute;
				const interaction = req.body as APIApplicationCommandInteraction;
				const user = DiscordAPIUtils.resolveUserFromInteraction(this.app, interaction);

				let promise: Promise<unknown>;

				switch (interaction.data.type) {
					case ApplicationCommandType.ChatInput:
						this.app.logger.info(
							`Chat input command "/${chatInputRoute.name}" executed by ${user?.username} (${user?.id})`,
						);

						promise = chatInputRoute.chatInputRun(
							new ChatInputInteraction(this.app, interaction as APIChatInputApplicationCommandInteraction),
						);
						break;
					case ApplicationCommandType.Message:
						this.app.logger.info(
							`Message context command "${chatInputRoute.name}" executed by ${user?.username} (${user?.id})`,
						);

						promise = chatInputRoute.chatInputRun(
							new MessageContextMenuInteraction(this.app, interaction as APIMessageApplicationCommandInteraction),
						);
						break;
					case ApplicationCommandType.User:
						this.app.logger.info(
							`User context command "${chatInputRoute.name}" executed by ${user?.username} (${user?.id})`,
						);

						promise = chatInputRoute.chatInputRun(
							new UserContextMenuInteraction(this.app, interaction as APIUserApplicationCommandInteraction),
						);
				}

				promise.then(() => req.randId && this.emit(RouterEvents.FinishedRun(req.randId), res));

				break;
			}
			case InteractionType.MessageComponent: {
				const componentRoute = route as MessageComponentRoute;
				const interaction = req.body as APIMessageComponentInteraction;
				const user = DiscordAPIUtils.resolveUserFromInteraction(this.app, interaction);

				let promise: Promise<unknown>;

				switch (interaction.data.component_type) {
					case ComponentType.Button: {
						this.app.logger.info(
							`Button with ID "${componentRoute.customId}" executed by ${user?.username} (${user?.id})`,
						);

						promise = componentRoute.buttonRun(
							new ButtonInteraction(this.app, interaction as APIMessageComponentButtonInteraction),
						);
						break;
					}
					default: {
						this.app.logger.warn('Unknown component type.', interaction.data.component_type);
						throw new RequestorError('Unknown component type.', 400);
					}
				}

				promise.then(() => req.randId && this.emit(RouterEvents.FinishedRun(req.randId), res));

				break;
			}
			default: {
				throw new Error('No handler for this interaction type.');
			}
		}

		return res.status(200).json(await promise);
	}
}
