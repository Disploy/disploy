<div align="center">
	<br />
	<p>
		<a href="https://disploy.dev"><img src="https://disploy.dev/img/logo.svg" alt="disploy" width="200" /></a>
	</p>
    <p>
		<a href="https://vercel.com/?utm_source=disploy&utm_campaign=oss"><img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Vercel" /></a>
	</p>
    <h3>
        Visit <a href="https://disploy.dev">disploy.dev</a> to get started!
    </h3>
	<br />
	<p>
		<a href="https://discord.gg/E3z8MDnTWn"><img src="https://img.shields.io/discord/901426442242498650?color=5865F2&logo=discord&logoColor=white" alt="Disploy's Discord server" /></a>
		<a href="https://github.com/disploy/Disploy/actions"><img src="https://github.com/Disploy/disploy/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>
	</p>

</div>

> **Warning**: We're still in development, and packages are published to npm every 12 hours to the `@dev` tag. You can view our [v1.0.0 milestone](https://github.com/Disploy/disploy/milestone/1) to see what features are planned for the first release and their current status.

Disploy is a library for building HTTP interaction-based Discord bots with ease. It's designed to make it easy to build, test and deploy Discord bots.

# Features

Disploy features a [library](#library) and an opinionated [framework](#framework) with tooling inspired by Next.js.

## Library

> Disploy does not come included with a "server", that's up to you to implement. We have a [guide](https://disploy.dev/docs/Reference/framework-less/) showcasing you how to do so with Express (Node.js) and Deno's inbuilt server.

In this readme, we have supplied you with a more slimmed-down guide on usage with Next.js as your server.

### Usage with Next.js

The API entry point

```ts
// Entrypoint - pages/api/interactions.ts
import { createNextAdapter } from 'disploy';
import { App } from '../../lib/main';

export default createNextAdapter(SafecordApp);
```

> **Note**: An "adapter" is a function that transforms requests from your server implementation of choice and creates a [`TRequest`](https://disploy.dev/docs/Documentation/disploy/interfaces/TRequest) that's fed into `App#router#entry` which returns a [`Promise<TResponse>`](https://disploy.dev/docs/Documentation/disploy/classes/TResponse) which your adapter should transform and return to Discord.

Setting up the Disploy App

```ts
// Main Bot - lib/core/main.ts
import { App } from 'disploy';
import commands from './commands/commands';

const clientId = process.env.DISCORD_CLIENT_ID;
const token = process.env.DISCORD_TOKEN;
const publicKey = process.env.DISCORD_PUBLIC_KEY;

if (!clientId || !token || !publicKey) {
	throw new Error('Missing environment variables');
}

export const SafecordApp = new App({
	logger: {
		debug: true,
	},
});

SafecordApp.start({
	clientId,
	token,
	publicKey,
});

for (const command of commands) {
	SafecordApp.commands.registerCommand(command);
}
```

Setting up an array of commands

```ts
// Command Array - lib/core/commands/commands.ts
import Ping from './core/ping';

const c = [Ping];

export default c;
```

Example command

```ts
import type { ChatInputInteraction, Command } from 'disploy';

const Ping: Command = {
	name: 'ping',
	description: 'pong!',

	run(interaction: ChatInputInteraction) {
		interaction.reply({
			content: 'Hello World!',
		});
	},
};

export default Ping;
```

## Framework

Disploy comes inbuilt with a CLI that can bundle your bot based on a file system structure. Inspired by Next.js.

Use the "TypeScript Framework" boilerplate from [`create-disploy-app`](https://github.com/Disploy/create-disploy-app).

```bash
npx create-disploy-app@latest
```

Here are two examples, a command and a message component handler. Keep in mind none of this is exclusive to the framework, the only "framework exclusive" feature showcased here is the file structure and default exports.

```ts
// Example command - commands/ping.ts
import type { Command } from 'disploy';

export default {
	// Command "data"
	name: 'ping',
	description: 'pong!',

	// Command entrypoint
	async run(interaction) {
		if (!interaction.guild) {
			return void interaction.reply({
				content: 'You must use this in a guild.',
			});
		}

		interaction.deferReply(); // Synchronously reply to the incoming HTTP request
		const guild = await interaction.guild.fetch(); // BaseInteraction#guild is a ToBeFetched class, awaiting fetch on it will return the full structure

		// All our methods take in raw JSON (or our Message structure, coming soon)
		return void interaction.editReply({
			content: 'hello world!!!!!!!!',
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: 'Click me!',
							style: 1,
							custom_id: `ping-${interaction.user.id}`, // You can handle message components with express-like routes.
						},
					],
				},
			],
		});
	},
} satisfies Command;
```

```ts
// Example message component handler - handlers/ping.ts
import type { ButtonHandler } from "disploy";

export default {
	customId: 'ping-:userId',

	async run(interaction) {
		const originalUser = await interaction.params.getUserParam('userId'); // This fetches a user structure from the interaction's params, it would be better to use getParam in this use case, but we're showcasing the getUserParam method here.
		const clicker = interaction.user;

		return void interaction.reply({
			content: `hello world!!!!!!!! (clicked by ${clicker}) [made by ${originalUser}]`,
		});
	},
} satisfies ButtonHandler;
```

```bash
disploy dev # test your bot locally with hot-reloading and tunneling
```

```bash
disploy deploy # deploy your bot to Cloudflare Workers
```

The CLI bundles your app by taking in commands and message components and turning them into a single bundle. It accomplishes this by transforming your default exports into an array, creating an App instance, and attaching an adapter for your specified target.

## Planned Features

### Testing

`@disploy/disbench` will be a testing library that will allow you to test your bot in a similar way to how you would test a web app with a mocked Discord API.

Example usage (this is not final):

```ts
// Disbench demo snippet (fake code)
import { Disbench } from '@disploy/disbench';

const disbench = new Disbench({
	app: 'dist/bot.js',
});

await disbench.setup(); // This will start the bot and start communicating with the framework to "deploy" commands to the mocked API

const echoCommand = disbench.commands.find({ name: 'echo' });

const response = await disbench.interact(echoCommand, {
	options: {
		message: 'Hello World!',
	},
});

expect(response).toEqual('Hello World!');
```

---

https://discord.gg/E3z8MDnTWn - Join our Discord server for support and updates!
