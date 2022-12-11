import chokidar from 'chokidar';
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync, statSync } from 'fs';
import { join } from 'path';

const copy = (src, dest) => {
	if (existsSync(src)) {
		if (statSync(src).isDirectory()) {
			if (!existsSync(dest)) {
				mkdirSync(dest, { recursive: true });
			}
			readdirSync(src).forEach((file) => {
				console.log(`📁 Copying ${file} from ${src} to ${dest}`);
				copy(join(src, file), join(dest, file));
			});
		} else {
			copyFileSync(src, dest);
		}
	}
};

/**
 * @type {import('chokidar').FSWatcher}
 */
let listener = null;

export const copyAssets = () => {
	if (existsSync('./dist/cli/assets')) {
		rmdirSync('./dist/cli/assets', { recursive: true });
	}
	copy('./cli/assets', './dist/cli/assets');
};

export function startWatching() {
	listener = chokidar.watch('./cli/assets');

	listener.on('all', () => copyAssets());
}

export function stopWatching() {
	if (!listener) throw new Error('No listener to stop');
	listener.close();
}
