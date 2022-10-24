import type { App } from "../structs/App";

export type IAdapter<T> = (app: App, server: T) => void;
export type IReqResAdapter<REQ, RES> = (app: App, req: REQ, res: RES) => void;
