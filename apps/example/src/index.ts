import { Gateway } from '@disploy/ws';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { App, Command, expressAdapter, MessageComponentHandler } from 'disploy';
import express from 'express';
import glob from 'glob';
import path from 'path';
import type { EventHandler } from './types/EventHandler';

// Handle environment variables
// recommend(tristan): use env-cmd to load a .env file
const clientId = process.env.DISCORD_CLIENT_ID;
const token = process.env.DISCORD_TOKEN;
const publicKey = process.env.DISCORD_PUBLIC_KEY;

if (!clientId || !token || !publicKey) {
	throw new Error('Missing environment variables');
}

// Setup Discord application
const app = new App();

app.start({
	clientId,
	token,
	publicKey,
});

// Load commands
glob(path.join(__dirname, 'commands', '**', '*.js').replaceAll('\\', '/'), async (err, files) => {
	if (err) {
		throw err;
	}

	await Promise.all(
		files.map(async (file) => {
			const command = (await import(file)).default as Command;

			app.commands.registerCommand(command);
		}),
	);
});

if (process.argv.includes('--sync') || process.argv.includes('--sync-merge')) {
	app.commands.syncCommands(process.argv.includes('--sync-merge'));
}

// Load message components
glob(path.join(__dirname, 'handlers', '**', '*.js').replaceAll('\\', '/'), async (err, files) => {
	if (err) {
		throw err;
	}

	await Promise.all(
		files.map(async (file) => {
			const handler = (await import(file)).default as MessageComponentHandler;

			app.handlers.registerHandler(handler);
		}),
	);
});

// Setup gateway connection
app.ws = new Gateway(app, {
	intents: GatewayIntentBits.MessageContent | GatewayIntentBits.GuildMessages | GatewayIntentBits.GuildVoiceStates,
});

// Load event handlers
glob(path.join(__dirname, 'events', '**', '*.js').replaceAll('\\', '/'), async (err, files) => {
	if (err) {
		throw err;
	}

	await Promise.all(
		files.map(async (file) => {
			const handler = (await import(file)).default as EventHandler<any>;

			app.ws.on(handler.event, handler.handle);
		}),
	);
});

// Setup interaction server
const interactionServer = express();

interactionServer.use(express.json());
expressAdapter(app, interactionServer);

interactionServer.listen(3000, () => {
	console.log('[interaction server] Listening on port 3000');
});

// Connect to gateway
app.ws.connect();

// Types
declare module 'disploy' {
	interface App {
		ws: Gateway;
	}
}
