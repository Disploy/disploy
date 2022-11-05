import { exec } from 'shelljs';
import { s } from './s';

export async function asyncExec(command: string) {
	return new Promise((resolve, reject) => {
		exec(s(command), { async: false }, (code: number, stdout: string, stderr: string) => {
			if (code !== 0) {
				const e: Error = new Error();
				e.message = stderr;
				e.name = String(code);
				reject(e);
			} else {
				resolve(stdout);
			}
		});
	});
}
