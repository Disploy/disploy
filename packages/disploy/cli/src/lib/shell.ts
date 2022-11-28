import { spawn, StdioOptions } from 'node:child_process';

export async function runShellCommand(c: string, stdioMode: StdioOptions = 'ignore') {
	await new Promise<void>((resolve, reject) => {
		try {
			spawn(c.split(' ')[0]!, c.split(' ').slice(1), {
				cwd: process.cwd(),
				stdio: stdioMode,
			}).on('exit', (code) => {
				if (code === 0) {
					resolve();
				} else {
					reject();
				}
			});
		} catch (error) {
			reject(error);
		}
	});
}
