import { App } from "@disploy/framework";
import { Commands } from "commands";

export const app = new App({
  logger: {
    level: "debug",
  },
});

app.start({ commands: Commands });
// test!
