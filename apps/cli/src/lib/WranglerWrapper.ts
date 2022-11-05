import { execSync } from 'child_process';
import type { DisployConfig } from './disployConf';
import { UserError } from './UserError';

export class WranglerWrapper {
	constructor(private readonly config: DisployConfig, private readonly entryFilePath: string) {
		try {
			execSync('wrangler --version', { stdio: 'ignore' });
		} catch (e) {
			throw new UserError('Wrangler is not installed. Please install it with `npm install -g wrangler`.');
		}
	}

	public async publish() {
		if (this.config.target.type !== 'cloudflare') {
			throw new UserError('This project is not configured to be deployed to Cloudflare Workers.');
		}

		execSync(
			`wrangler publish ${this.entryFilePath} --compatibility-date 2022-11-05 --name ${this.config.target.name} --node-compat true`,
			{ stdio: 'inherit' },
		);
	}
}
