---
sidebar_position: 1
---

# Introduction

:::warning

We're still in development, and packages are published to NPM every 12 hours to the `@dev` tag. You can view our [v1.0.0 milestone](https://github.com/Disploy/disploy/milestone/1) to see what features are planned for the first release and their current status.

:::

Disploy is a library for building HTTP interaction based Discord bots with ease. It's designed to make it easy to build, test and deploy Discord bots.

# Features

Disploy features a [library](#library) and an opinionated [framework](#framework) with a tooling inspired from Next.js.

## Library

> Disploy does not come included with a "server", that's up to you to implement. We have a [guide](/docs/Reference/framework-less) showcasing you how to do so with Express (Node.js) and Deno's inbuilt server.

In this readme we have supplied you with a more slimmed down guide on usage with Next.js as your server.

### Usage with Next.js

The API entrypoint

```ts
// Entrypoint - pages/api/interactions.ts
import { createNextAdapter } from 'disploy';
import { App } from '../../lib/main';

export default createNextAdapter(SafecordApp);
```

:::tip
An "adapter" is a function that transforms requests from your server implementation of choice and creates a `TRequest` that's fed into `App#router#entry` which returns a `Promise<TResponse>` which your adapter should transform and return to Discord.
:::

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

Disploy comes inbuilt with a CLI that can bundle your bot based of a file system structure. Inspired by Next.js.

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
import type { ButtonHandler } from 'disploy';

export default {
	customId: 'ping-:userId',

	async run(interaction) {
		return void interaction.reply({
			content: `hello world!!!!!!!! (clicked by ${interaction.user}) [made by <@${interaction.params.getParam(
				'userId',
			)}>]`,
		});
	},
}  satisfies ButtonHandler;
```

```bash
disploy dev # test your bot locally with hot-reloading and tunneling
```

```bash
disploy deploy # deploy your bot to Cloudflare Workers
```

The CLI bundles your app by taking in commands and message components and turning them into a single bundle. It accomplishes this by transforming your default exports into an array, creating an App instance and attaching an adapter for your specified target.

This guide will walk you through the basics of Disploy, we recommend reading it from top to bottom. If you have any questions, feel free to ask in our [Discord server](https://discord.gg/E3z8MDnTWn).
