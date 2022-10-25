import type { ReplyHook } from "../ReplyHook";
import type { Rest } from "../rest";

export class Base {
  public constructor(protected replyHook: ReplyHook, rest: Rest) {
    Object.defineProperty(this, "rest", { value: rest });
  }
}
