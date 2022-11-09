import { logger } from '../utils/logger';

export class UserError extends Error {
	constructor(message: string, killProcess: boolean = true) {
		super(message);

		logger.error(`⚠️  ${message}`);

		if (killProcess) {
			process.exit(1);
		}
	}
}
