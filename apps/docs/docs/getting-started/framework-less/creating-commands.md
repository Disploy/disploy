---
sidebar_position: 4
---

# Creating commands

In the previous page, we mentioned importing `commands` from `./commands/commands.mjs` and recursively loading them. In this page, we'll go over how to actually create that file.

## Creating the file

First, we'll create the file. We'll call it `commands.mjs` and put it in a folder called `commands`.

```bash
mkdir commands
touch commands/commands.mjs
```

```js
// commands/commands.mjs
import Ping from './core/ping.mjs';

export default [Ping];
```

This file is the entry point for all of our commands. It's where we'll import all of our commands and export them as an array.

## Creating the command

Now, we'll create the command. We'll call it `ping` and put it in a folder called `core`.

```bash
mkdir commands/core
touch commands/core/ping.mjs
```

```js
export default {
	name: 'ping',
	description: 'Ping the bot',

	run(interaction: ChatInputInteraction) {
		interaction.reply({
			content: 'Pong!',
		});
	},
};
```

This is the command itself. It's a simple ping command that replies with `Pong!` when you run it.
