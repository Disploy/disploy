---
sidebar_position: 1
---

# Creating commands

Commands are easy to create with Disploy, simply export default classes which extend the [`Command` class](/docs/Documentation/disploy/classes/Command) and store them in the `commands` directory.

```
├── commands
│   └── ping.ts
```

```ts
// commands/ping.ts
import type { Command } from 'disploy';

export default {
	name: 'ping',
	description: 'pong!',

	async run(interaction) {
		return void interaction.reply({
			content: 'hello world!!!!!!!!',
		})
	}

} satisfies Command;
```

## So what's going on here?

Firstly, we're importing the `Command` type from Disploy. This is the type used by all commands. You can learn more about interaction types in the [Discord documentation](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types). We then export a default object which conforms to the `Command` type. This object is the command itself. We then define a constructor for the class.

### `run`

The `run` method is called when the command is run. It takes a single argument, the interaction. The interaction is an object which contains information about the interaction, such as the user who ran the command, the arguments they provided, and the channel the command was run in.

The `run` method must return `Promise<void>`, once returned the command will be considered finished; in serverless environments this will kill the process. This allows you to run code after initially responding to the interaction. This is useful for doing things like sending follow-up messages or deferring the interaction to do a long-running task and editing the interaction later.

<details>
  <summary> Example of a command with follow-up messages </summary>

```ts
import type { Command } from 'disploy';

export default {
	name: 'hey',
	description: 'heyy!',

	async run(interaction) {
		interaction.deferReply();

		await new Promise((resolve) => setTimeout(resolve, 2000));

		return void interaction.editReply({
			content: `Just wanted to say hey!`,
		});
	}
} satisfies Command;

```

</details>
