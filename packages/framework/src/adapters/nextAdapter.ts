import type { NextApiRequest, NextApiResponse } from "next";
import type { App } from "../client";
import type { TRequest } from "../http";

export function createNextAdapter(app: App) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      res.status(405);
      res.json({ error: "Method not allowed" });
      return;
    }

    const tReq: TRequest = {
      body: req.body,
      headers: req.headers,
      _request: req,
    };

    const payload = await app.router.entry(tReq);
    const { status, headers, body } = payload.serialized;

    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value as string);
    }

    res.status(status).send(body);
  };
}
