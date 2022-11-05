export class ConsoleManager {
	public static log(...args: any[]) {
		if (process.env.NODE_ENV === 'Development') {
			console.log(...args);
		}
	}
}
