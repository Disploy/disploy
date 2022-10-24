import type { Rest } from "../rest";

export class Base {
  public constructor(public client: Rest) {
    Object.defineProperty(this, "client", { value: client });
  }
}
