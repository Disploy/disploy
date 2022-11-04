import glob from 'glob';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CompilerAssets } from './assets';

export async function parseCommands(workbench: string) {
	const commandsDir = path.join(workbench, 'commands');

	const commandsFiles = await new Promise<string[]>((resolve, reject) => {
		glob(`${commandsDir}/**/*.js`, (err, files) => {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});

	const commands = await Promise.all(
		commandsFiles.map(async (file) => {
			let code = await readFile(file, 'utf-8');
			const commandName = path.basename(file, '.js');

			code = code.replace(/export default class ([a-zA-Z0-9]+) /, `export class ${commandName} `);

			return await writeFile(file, code);
		}),
	);

	const commandVirts = commandsFiles.reduce((acc, file) => {
		// @ts-ignore
		acc[path.basename(file, '.js')] = commands[commandsFiles.indexOf(file)];
		return acc;
	}, {});

	const commandArray = CompilerAssets.commandArray({
		imports: commandsFiles
			.map((file) => `import {${path.basename(file, '.js')}} from "./commands/${path.basename(file, '.js')}";`)
			.join('\n'),
		array: commandsFiles.map((file) => `new ${path.basename(file, '.js')}`).join(',\n'),
	});

	await writeFile(path.join(workbench, 'commands.js'), commandArray);

	return { commandVirts, commandArray };
}
