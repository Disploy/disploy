/* eslint-disable turbo/no-undeclared-env-vars */
import { ExampleApp } from "@disploy/example";
import { expressAdapter } from "@disploy/framework";
import bodyParser from "body-parser";
import express from "express";

const server = express();
server.use(bodyParser.json());

expressAdapter(ExampleApp, server);

server.listen(4000, () => {
  console.log("🚀 Express server is running on port 4000");
});
