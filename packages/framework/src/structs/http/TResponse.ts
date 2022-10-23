export class TResponse {
  constructor(private _sendJson: (body: any) => void) {}

  public body!: string;

  public json(body: any) {
    this._sendJson(body);
  }

  public send(body: string) {
    this.body = body;

    throw new Error("Not implemented");
  }
}
