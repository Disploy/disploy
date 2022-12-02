<div align="center">
	<br />
	<p>
		<a href="https://disploy.dev"><img src="https://disploy.dev/img/logo.svg" alt="disploy" width="200" /></a>
	</p>
    <p>
		<a href="https://vercel.com/?utm_source=disploy&utm_campaign=oss"><img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Vercel" /></a>
	</p>
    <h3>
        @disploy/ws
    </h3>
	<br />
	<p>
		<a href="https://discord.gg/E3z8MDnTWn"><img src="https://img.shields.io/discord/901426442242498650?color=5865F2&logo=discord&logoColor=white" alt="Disploy's Discord server" /></a>
	</p>

</div>

## Overview

`@disploy/ws` is a WebSocket extension for Disploy. It is used to communicate with the Discord gateway.
This allows you to receive events from Discord and utilize `@discordjs/voice`.

## Workflow

```ts
import { Gateway } from '@disploy/ws';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { App, expressAdapter } from 'disploy';
import express from 'express';

// Handle environment variables
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

// Setup gateway connection
app.ws = new Gateway(app, {
	intents: GatewayIntentBits.MessageContent | GatewayIntentBits.GuildMessages,
});

// Example event listener
app.ws.on('messageCreate', (message) => {
	if (message.content === 'ping') {
		message.reply({
			content: 'pong',
		});
	}
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
```

You can find more examples in the [example bot](https://github.com/Disploy/disploy/tree/main/apps/example) including the usage of `@discordjs/voice`.

## Need Help?

https://discord.gg/E3z8MDnTWn - Join our Discord server for support and updates!
