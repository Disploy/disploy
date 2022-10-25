import { Rest } from "@disploy/core";
import { Router } from "./router/Router";

interface AppOptions {
  publicKey: string;
  token: string;
  clientID: string;
}

export class App {
  public publicKey!: string;
  public clientID!: string;
  public router!: Router;
  public token!: string;
  public rest!: Rest;

  public constructor(options: AppOptions) {
    this.publicKey = options.publicKey;
    this.token = options.token;
    this.clientID = options.clientID;

    this.rest = new Rest({ token: this.token });
    this.router = new Router(this);
  }
}
