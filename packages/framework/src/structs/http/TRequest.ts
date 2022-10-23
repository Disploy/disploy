import type { IncomingHttpHeaders } from "node:http";
import type { TParams } from "./TParams";

export class TRequest {
  public body!: any;
  public query!: any;
  public headers!: IncomingHttpHeaders;
  public method!: string;
  public path!: string;
  public params!: TParams;

  constructor({
    body,
    query,
    headers,
    method,
    path,
    params,
  }: {
    body: any;
    query: any;
    headers: IncomingHttpHeaders;
    method: string;
    path: string;
    params: TParams;
  }) {
    this.body = body;
    this.query = query;
    this.headers = headers;
    this.method = method;
    this.path = path;
    this.params = params;
  }
}
