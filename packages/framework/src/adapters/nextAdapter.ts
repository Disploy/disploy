import type { NextApiRequest, NextApiResponse } from "next";
import type { App } from "../structs";
import { TRequest, TResponse } from "../structs/http";

export function createNextAdapter(app: App) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      res.status(405);
      res.json({ error: "Method not allowed" });
      return;
    }

    const tReq = new TRequest({
      body: req.body,
      query: req.query,
      headers: req.headers,
      method: req.method,
      params: Object.entries(req.query).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Array.isArray(value) ? value[0] : value,
        }),
        {}
      ),
    });

    const tRes = new TResponse((body) => {
      res.json(body);
    });

    return void app._handle(tReq, tRes);
  };
}
