import type { App, Command } from 'disploy';

export interface DisployStandaloneBundle {
	app: App;
	commands: Command[];
}
