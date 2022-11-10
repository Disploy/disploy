import glob from 'glob';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CompilerAssets } from './assets';

export async function parseCommands(workbench: string) {
	const commandsDir = path.join(workbench, 'commands');

	const commandsFiles = await new Promise<string[]>((resolve, reject) => {
		glob(`${commandsDir}/**/*.js`, async (err, files) => {
			if (err) {
				reject(err);
			} else {
				const commands = await Promise.all(
					files.map(async (file) => {
						const contents = await readFile(file, 'utf8');
						const match = contents.match(/export default/);

						if (match) {
							return file;
						} else {
							return null;
						}
					}),
				);

				resolve(commands.filter((command) => command !== null) as string[]);
			}
		});
	});

	await Promise.all(
		commandsFiles.map(async (file) => {
			let code = await readFile(file, 'utf-8');
			const commandName = path.basename(file, '.js');

			code = code.replace(/export default/, `export const ${commandName} = `);

			return writeFile(file, code);
		}),
	);

	const commandArray = CompilerAssets.commandArray({
		imports: commandsFiles
			.map((file) => `import {${path.basename(file, '.js')}} from "./commands/${path.basename(file, '.js')}";`)
			.join('\n'),
		array: commandsFiles.map((file) => `${path.basename(file, '.js')}`).join(',\n'),
	});

	await writeFile(path.join(workbench, 'commands.js'), commandArray);
}
