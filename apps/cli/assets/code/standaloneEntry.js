import { App } from "@disploy/framework";
import { Commands } from "./commands";

const app = new App({
  logger: {
    debug: true,
  },
});

export default [app, Commands];
