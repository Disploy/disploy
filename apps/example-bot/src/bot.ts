import { App, expressAdapter } from "@disploy/framework";
import bodyParser from "body-parser";
import express from "express";

const server = express();
server.use(bodyParser.json());

const app = new App();

expressAdapter(app, server);

server.listen(3000, () => {
  console.log("🚀 Express server is running on port 3000");
});
