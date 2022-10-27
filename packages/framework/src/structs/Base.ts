import type { App } from "../client";

export class Base {
  public constructor(protected app: App) {
    Object.defineProperty(this, "app", { value: app });
  }
}
