import { App } from 'disploy';
import { Commands } from './Commands';
import { Handlers } from './Handlers';

const app = new App({
	commands: Commands,
	handlers: Handlers,
	env: process.env ?? Deno.env.toObject(),
});

export default { app, commands: Commands, handlers: Handlers };
