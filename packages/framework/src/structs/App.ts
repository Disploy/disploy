import type { TRequest, TResponse } from "./http";

export class App {
  public _handle(req: TRequest, res: TResponse) {
    // TODO: Implement actual logic and not just a placeholder test.
    res.json({
      hello: `Hello, ${req.body.name}!`,
    });
  }
}
