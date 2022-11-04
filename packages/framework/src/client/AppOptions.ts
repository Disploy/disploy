import type { Command } from "../commands";

export interface LoggerOptions {
  debug?: boolean;
}

export interface AppOptions {
  logger?: LoggerOptions;
  commands?: Command[];
}
