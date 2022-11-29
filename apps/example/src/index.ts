import { Gateway } from '@disploy/ws';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { App } from 'disploy';

const clientId = process.env.DISCORD_CLIENT_ID;
const token = process.env.DISCORD_TOKEN;
const publicKey = process.env.DISCORD_PUBLIC_KEY;

if (!clientId || !token || !publicKey) {
	throw new Error('Missing environment variables');
}

export const app = new App({
	logger: {
		debug: true,
	},
});

export const gateway = new Gateway(app, {
	intents: GatewayIntentBits.MessageContent | GatewayIntentBits.GuildMessages,
});

gateway.on('message', (message) => {
	if (!message.content.startsWith('!')) return;

	switch (message.content.slice(1)) {
		case 'ping':
			message.reply({
				content: 'pong!',
			});
			break;
	}
});

app.start({
	clientId,
	token,
	publicKey,
});

gateway.connect();
