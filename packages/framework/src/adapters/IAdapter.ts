import type { App } from "../structs/App";

export type IAdapter<T> = (app: App, server: T) => void;
