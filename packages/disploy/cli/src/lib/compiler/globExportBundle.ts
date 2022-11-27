import glob from 'glob';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CompilerAssets } from './assets';

interface Module {
	name: string;
	code: string;
	exactPath: string;
	path: string;
}

function parseModuleName(name: string) {
	return `${name.replace(/[^a-zA-Z0-9_]/g, '_')}_${Math.random().toString(36).slice(2)}`;
}

export async function globExportBundle(
	workbench: string,
	{
		pathFromWorkbench,
		name: exportedName,
	}: {
		pathFromWorkbench: string;
		name: string;
	},
) {
	const modulesDir = path.join(workbench, pathFromWorkbench);

	const moduleFiles = await new Promise<Module[]>((resolve, reject) => {
		glob(`${modulesDir.replaceAll('\\', '/')}/**/*.js`, async (err, files) => {
			if (err) {
				reject(err);
			} else {
				const modules = await Promise.all(
					files.map(async (file) => {
						const contents = await readFile(file, 'utf8');
						const match = contents.match(/export default/);

						if (!match) return null;

						return file;
					}),
				);

				// resolve(modules.filter((module) => module !== null) as string[]);
				resolve(
					Promise.all(
						modules
							.filter((module) => module !== null)
							.map(async (module) => ({
								name: path.basename(parseModuleName(module as string), '.js'),
								code: await readFile(module as string, 'utf-8'),
								exactPath: module as string,
								path: path.relative(modulesDir, module as string),
							})),
					),
				);
			}
		});
	});

	for (const module of moduleFiles) {
		const code = module.code.replace(/export default/, `export const ${module.name} = `);
		await writeFile(module.exactPath, code);
	}

	const moduleArray = CompilerAssets.array({
		name: exportedName,
		imports: moduleFiles
			.map((module) => `import {${module.name}} from "./${pathFromWorkbench}/${module.path}";`)
			.join('\n'),
		array: moduleFiles.map((module) => `${path.basename(module.name, '.js')}`).join(',\n'),
	});

	await writeFile(path.join(workbench, `${exportedName}.js`), moduleArray);
}
