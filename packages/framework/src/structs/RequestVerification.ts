import nacl from "tweetnacl";

export class RequestVerification {
  public constructor(private publicKey: string) {}

  async verify(
    body: string,
    signature: string,
    timestamp: string
  ): Promise<boolean> {
    try {
      return nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(this.publicKey, "hex")
      );
    } catch {
      return false;
    }
  }
}
