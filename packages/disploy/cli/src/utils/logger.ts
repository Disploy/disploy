import * as color from 'colorette';

class Logger {
	public constructor(private readonly options: { debug: boolean }) {}

	private log(message: string, form: (text: string) => string, ...args: any[]) {
		console.log(form(message), ...args);
	}

	private box(message: string) {
		const lines = message.split('\n');
		const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b));
		const box = `┌${'─'.repeat(longestLine.length + 2)}┐
${lines.map((line) => `│ ${line}${' '.repeat(longestLine.length - line.length)} │`).join('\n')}
└${'─'.repeat(longestLine.length + 2)}┘`;

		return box;
	}

	public debug(message: string, ...args: any[]) {
		if (!this.options.debug) return;

		this.log(message, color.cyan, ...args);
	}

	public info(message: string, ...args: any[]) {
		this.log(message, color.magenta, ...args);
	}

	public warn(message: string, ...args: any[]) {
		this.log(this.box(message), color.yellowBright, ...args);
	}

	public error(message: string, ...args: any[]) {
		this.log(message, color.red, ...args);
	}
}

export const logger = new Logger({
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	debug: true,
});
