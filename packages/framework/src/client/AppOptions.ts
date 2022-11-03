import type { LevelWithSilent } from "pino";
import type { Command } from "../commands";

export interface LoggerOptions {
  level?: LevelWithSilent;
}

export interface AppOptions {
  logger?: LoggerOptions;
  commands?: Command[];
}
