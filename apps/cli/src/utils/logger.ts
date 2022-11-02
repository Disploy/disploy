import pino from "pino";

export const logger = pino({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  level: process.env.LOG_LEVEL ?? "info",
  transport: {
    target: "pino-pretty",
  },
});
