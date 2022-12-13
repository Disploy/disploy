export interface LoggerOptions {
	/**
	 * Whether to log debug messages.
	 */
	debug: boolean;
}

export class Logger {
	public constructor(private readonly options: LoggerOptions) {}

	private log(message: string, ...args: any[]) {
		console.log(message, ...args);
	}

	public debug(message: string, ...args: any[]) {
		if (!this.options.debug) return;

		this.log(message, ...args);
	}

	public info(message: string, ...args: any[]) {
		this.log(message, ...args);
	}

	public warn(message: string, ...args: any[]) {
		this.log(message, ...args);
	}

	public error(message: string, ...args: any[]) {
		this.log(message, ...args);
	}
}
