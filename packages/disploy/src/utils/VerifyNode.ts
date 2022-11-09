import type nacl from 'tweetnacl';
import { RuntimeConstants } from './runtime';
import { Verify } from './Verify';

export class VerifyNode extends Verify {
	private nacl?: nacl;

	override async verify(body: string, signature: string, timestamp: string): Promise<boolean> {
		if (!this.nacl) {
			RuntimeConstants.isNode && (this.nacl = (await import('tweetnacl')).default);
		}

		try {
			return this.nacl!.sign.detached.verify(
				Buffer.from(timestamp + body),
				Buffer.from(signature, 'hex'),
				Buffer.from(this.app.publicKey, 'hex'),
			);
		} catch {
			return false;
		}
	}
}
