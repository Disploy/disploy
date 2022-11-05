import * as fs from 'fs-extra';
import { existsSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as shell from 'shelljs';
import { asyncExec } from '../utils/asyncExec';
import { s } from '../utils/s';
import { ConsoleManager } from './ConsoleManager';
import { Extra } from './Extra';
import type { GitStarterDatabase } from './GitStarterDatabase';
import type { PackageStarterJson, StarterPayload } from './types';

export class Starter {
	public base!: string;

	public description!: string;
	public name!: string;
	public extras!: Extra[];
	public db!: GitStarterDatabase;

	constructor(db: GitStarterDatabase, data: StarterPayload) {
		this.base = data.base;
		this.name = data.name;
		this.description = data.description;
		this.extras = data.extras.map((extra) => new Extra(extra));
		this.db = db;
	}

	public async install(
		extras: Extra[] = [],
		cwd: string = process.cwd(),
		packageManager: string = 'npm',
	): Promise<number> {
		const stopWatch = new Date().getTime();
		const { log } = ConsoleManager;

		const cloneDir = path.join(os.homedir(), 'starters-tmp', this.base);
		await fs.mkdir(cloneDir, { recursive: true });

		log('Cloning', this.db.repo, 'to', cloneDir);

		shell.cd(cloneDir);

		if (!shell.which('git')) {
			throw new Error('Git is not installed');
		}

		if (existsSync(path.join(cloneDir, 'starters.json'))) {
			await asyncExec(s('git pull'));
		} else {
			await asyncExec(s(`git init .`));
			await asyncExec(s(`git remote add -t \* -f origin ${this.db.repo}`));
			await asyncExec(s(`git checkout main`));
		}

		log('Cloned!');

		const installDirs = ['base', ...extras.map((extra) => extra.location)];
		log('Merging features: ', installDirs);

		for (const dir of installDirs) {
			const src = path.join(cloneDir, 'starters', this.base, dir);
			const dest = path.join(cwd, 'project');
			await fs.copy(src, dest);
		}

		log('Merged!');

		const packageJson = (await fs.readJSON(
			path.join(cloneDir, 'starters', this.base, 'package.starter.json'),
		)) as PackageStarterJson;

		let finalPackageJson = {
			name: packageJson.name,
			version: packageJson.version,
			main: packageJson.main,
			scripts: packageJson.scripts,
			dependencies: packageJson.dependencies,
			devDependencies: packageJson.devDependencies,
		};

		// merge scripts
		for (const extra of extras) {
			// @ts-ignore - this is a hacky way to merge the scripts 🤞
			if (packageJson[`scripts:${extra.location}`]) {
				finalPackageJson.scripts = {
					...finalPackageJson.scripts,
					// @ts-ignore - this is a hacky way to merge the scripts 🤞
					...packageJson[`scripts:${extra.location}`],
				};
			}
		}

		// merge devDependencies
		for (const extra of extras) {
			// @ts-ignore - this is a hacky way to merge the scripts 🤞
			if (packageJson[`devDependencies:${extra.location}`]) {
				finalPackageJson.devDependencies = {
					...finalPackageJson.devDependencies,
					// @ts-ignore - this is a hacky way to merge the scripts 🤞
					...packageJson[`devDependencies:${extra.location}`],
				};
			}
		}

		// create tsconfig.json and new package.json
		await fs.writeJSON(path.join(cwd, 'project', 'package.json'), finalPackageJson, { spaces: 2 });
		await fs.writeJSON(path.join(cwd, 'project', 'tsconfig.json'), packageJson.tsconfig, { spaces: 2 });

		// install dependencies
		shell.cd(path.join(cwd, 'project'));
		await asyncExec(s(`${packageManager} install`));

		log('Installed!');
		return new Date().getTime() - stopWatch;
	}
}
