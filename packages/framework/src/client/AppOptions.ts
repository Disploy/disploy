import type { LevelWithSilent } from "pino";

export interface LoggerOptions {
  level?: LevelWithSilent;
}

export interface AppOptions {
  publicKey: string;
  token: string;
  clientID: string;
  logger?: LoggerOptions;
}
