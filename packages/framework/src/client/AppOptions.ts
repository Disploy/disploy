import type { LevelWithSilent } from "pino";

export interface LoggerOptions {
  level?: LevelWithSilent;
}

export interface AppOptions {
  logger?: LoggerOptions;
}
