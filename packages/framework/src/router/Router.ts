import { APIChatInputApplicationCommandInteraction, APIInteraction, InteractionType } from 'discord-api-types/v10';
import EventEmitter from 'eventemitter3';
import type { App } from '../client';
import { TResponse, type TRequest } from '../http';
import { ChatInputInteraction } from '../structs';
import { DiscordAPIUtils, RequestorError, RuntimeConstants, Verify, VerifyCFW, VerifyNode } from '../utils';
import type { BaseRoute } from './BaseRoute';
import type { ChatInputRoute } from './ChatInputRoute';

export class Router extends EventEmitter {
	private routes: BaseRoute[] = [];
	private verifier!: Verify;
	private app!: App;

	public constructor(app: App) {
		super();
		this.app = app;
		this.verifier = RuntimeConstants.isNode ? new VerifyNode(this.app) : new VerifyCFW(this.app);
	}

	public addRoute(route: BaseRoute) {
		this.routes.push(route);
	}

	private async verifyRequest(req: TRequest) {
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
						(route as ChatInputRoute).name === (payload as APIChatInputApplicationCommandInteraction).data.name,
				);
			default:
				return void 0;
		}
	}

	private async handle(req: TRequest, res: TResponse) {
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
			this.on(`${body.id}-respond`, (res: unknown) => {
				resolve(res);
			});
		});

		switch (route.type) {
			case InteractionType.ApplicationCommand: {
				const chatInputRoute: ChatInputRoute = route as ChatInputRoute;
				const interaction = req.body as APIChatInputApplicationCommandInteraction;
				const user = DiscordAPIUtils.resolveUserFromInteraction(interaction);

				this.app.logger.debug(
					`Chat input command "/${chatInputRoute.name}" executed by ${user?.username} (${user?.id})`,
				);

				chatInputRoute.chatInputRun(new ChatInputInteraction(this.app, interaction));
				break;
			}
			default: {
				throw new Error('No handler for this interaction type.');
			}
		}

		return res.status(200).json(await promise);
	}
}
