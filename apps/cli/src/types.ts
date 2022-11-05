import type { App, Command } from '@disploy/framework';

export interface DisployStandaloneBundle {
	app: App;
	commands: Command[];
}
