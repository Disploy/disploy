/* eslint-disable turbo/no-undeclared-env-vars */
import { ExampleApp } from "@disploy/example";
import { expressAdapter } from "@disploy/framework";
import bodyParser from "body-parser";
import express from "express";

const server = express();
server.use(bodyParser.json());

const app = new ExampleApp({
  clientID: process.env.CLIENT_ID!,
  publicKey: process.env.DISCORD_PUBLIC_KEY!,
  token: process.env.DISCORD_TOKEN!,
});

expressAdapter(app, server);

server.listen(4000, () => {
  console.log("🚀 Express server is running on port 4000");
});
