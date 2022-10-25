import {
  APIChatInputApplicationCommandInteraction,
  APIInteraction,
  ChatInputInteraction,
  InteractionType,
} from "@disploy/core";
import type { App } from "../App";
import { RequestorError, TRequest, TResponse } from "../http";
import { RequestVerification } from "../RequestVerification";
import type { BaseRoute } from "./BaseRoute";
import type { ChatInputRoute } from "./ChatInputRoute";

export class Router {
  private routes: BaseRoute[] = [];
  private verifier!: RequestVerification;
  // private app!: App;

  public constructor(app: App) {
    this.verifier = new RequestVerification(app.publicKey);
  }

  public addRoute(route: BaseRoute) {
    this.routes.push(route);
  }

  private async verifyRequest(req: TRequest) {
    const signature = req.headers["x-signature-ed25519"] as string;
    const timestamp = req.headers["x-signature-timestamp"] as string;

    if (
      !(await this.verifier.verify(
        JSON.stringify(req.body),
        signature,
        timestamp
      ))
    ) {
      throw new RequestorError("Invalid request signature.", 401);
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
          console.log("CAUGHT ERROR", err);
          return res.status(500).json({
            message: "Internal server error.",
          });
      }
    }
  }

  private routeResolver(payload: APIInteraction) {
    switch (payload.type) {
      case InteractionType.ApplicationCommand:
        console.log(this.routes);
        return this.routes.find(
          (route) =>
            route.type === InteractionType.ApplicationCommand &&
            (route as ChatInputRoute).name ===
              (payload as APIChatInputApplicationCommandInteraction).data.name
        );
      default:
        return void 0;
    }
  }

  private async handle(req: TRequest, res: TResponse) {
    await this.verifyRequest(req);

    if (req.body.type === 1) {
      return res.status(200).json({
        type: 1,
      });
    }

    const route = this.routeResolver(req.body);

    console.log(req.body);

    if (!route) {
      throw new Error("No route found for this interaction.");
    }

    switch (route.type) {
      case InteractionType.ApplicationCommand: {
        // TODO: Add proper typings which make a route automatically a ChatInputRoute if it's type is ChannelMessageWithSource
        const chatInputRoute: ChatInputRoute = route as ChatInputRoute;
        const body = req.body as APIChatInputApplicationCommandInteraction;

        // TODO: Rethink the "ReplyHook" concept
        //     We can't pass the rest client to the interaction due to it being wrapper in a promise.
        //     It also is really messy and not very intuitive.
        const p = new Promise((resolve) => {
          chatInputRoute.chatInputRun(
            new ChatInputInteraction(
              (data) => {
                resolve(data);
              },
              // @ts-ignore
              null, // this.app.rest,
              body
            )
          );
        });

        return res.status(200).json(await p);
      }
      default:
        throw new Error("No handler for this interaction type.");
    }
  }
}
