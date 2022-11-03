import type { App, TRequest } from "@disploy/framework";
import bodyParser from "body-parser";
import express from "express";
import { logger } from "../../utils/logger";

let app: App | null = null;

const server = express();
server.use(bodyParser.json());

server.post("/interactions", async (req, res) => {
  if (!app) {
    return void res.status(500).send("App not ready");
  }

  const tReq: TRequest = {
    body: req.body,
    headers: req.headers,
    _request: req,
  };

  const payload = await app.router.entry(tReq);
  const { status, headers, body } = payload.serialized;

  return void res.status(status).set(headers).send(body);
});

export function createServer(port: number) {
  server.listen(port, () => {
    logger.debug(`Express server listening on port ${port}`);
  });
}

export function setApp(newApp: App) {
  app = newApp;
  app.start({
    clientId: process.env.DISCORD_CLIENT_ID!,
    publicKey: process.env.DISCORD_PUBLIC_KEY!,
    token: process.env.DISCORD_TOKEN!,
  });
}
