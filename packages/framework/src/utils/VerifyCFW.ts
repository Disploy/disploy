import { Verify } from './Verify';

export class VerifyCFW extends Verify {
	private encoder = new TextEncoder();

	private PublicKey = crypto.subtle.importKey(
		'raw',
		this.hex2bin(this.app.publicKey),
		{
			name: 'NODE-ED25519',
			namedCurve: 'NODE-ED25519',
			// @ts-expect-error Cloudflare worker runtime
			public: true,
		},
		true,
		['verify'],
	);

	private hex2bin(hex: string) {
		console.log(hex);
		const buf = new Uint8Array(Math.ceil(hex.length / 2));
		for (var i = 0; i < buf.length; i++) {
			buf[i] = parseInt(hex.substr(i * 2, 2), 16);
		}
		return buf;
	}

	override async verify(body: string, signature: string, timestamp: string) {
		const verified = await crypto.subtle.verify(
			'NODE-ED25519',
			await this.PublicKey,
			this.hex2bin(signature),
			this.encoder.encode(timestamp + body),
		);
		if (!verified) return false;

		return true;
	}
}
