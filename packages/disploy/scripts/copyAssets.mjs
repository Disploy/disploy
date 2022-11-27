import { copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync, statSync, watch } from 'fs';
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

let listener = null;

export const copyAssets = () => {
	if (existsSync('./dist/cli/assets')) {
		rmdirSync('./dist/cli/assets', { recursive: true });
	}
	copy('./cli/assets', './dist/cli/assets');
};

export function startWatching() {
	listener = watch('./cli/assets', { recursive: true }, (eventType, filename) => {
		copyAssets();
	});
}

export function stopWatching() {
	if (!listener) throw new Error('No listener to stop');
	listener.close();
}
