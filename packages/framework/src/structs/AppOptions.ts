export interface LoggerOptions {
  level?: string;
}

export interface AppOptions {
  publicKey: string;
  token: string;
  clientID: string;
  logger?: LoggerOptions;
}
