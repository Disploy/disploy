import type * as Express from "express";
import { TRequest, TResponse } from "../structs/http";
import type { IAdapter } from "./IAdapter";

export const expressAdapter: IAdapter<Express.Application> = (app, server) => {
  server.post("/interactions", async (req, res) => {
    const tReq = new TRequest({
      body: req.body,
      query: req.query,
      headers: req.headers,
      method: req.method,
      params: req.params,
    });

    const tRes = new TResponse((body) => {
      res.json(body);
    });

    await app._handle(tReq, tRes);
  });
};
