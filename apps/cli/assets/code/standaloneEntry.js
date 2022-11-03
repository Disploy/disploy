import { App } from "@disploy/framework";
import { Commands } from "commands";

const app = new App({
  logger: {
    level: "debug",
  },
  commands: Commands,
});

export default app;
