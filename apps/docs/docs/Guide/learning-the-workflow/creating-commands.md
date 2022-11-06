---
sidebar_position: 1
---

# Creating commands

Commands are easy to create with the Disploy Framework, simply export default classes which extend the [`Command` class](/docs/Documentation/framework/classes/Command) and store them in the `commands` directory.

```
├── commands
│   └── ping.ts
```

```ts
// commands/ping.ts
import { Command, type ChatInputInteraction } from '@disploy/framework';

export default class PingCommand extends Command {
	public constructor() {
		super({
			name: 'ping',
			description: 'pong!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		return void interaction.reply({
			content: 'hello world!',
		});
	}
}
```

## So what's going on here?

Firstly, we're importing the `Command` class from the Disploy Framework. This is the base class for all commands. We're also importing the `ChatInputInteraction` type from the Disploy Framework. This is the type for interactions of the `CHAT_INPUT` type. You can learn more about interaction types in the [Discord documentation](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types). We then export a default class which extends the `Command` class. This class is the command itself. We then define a constructor for the class.

### Constructor

The constructor takes an object with the following properties:

- `name` - The name of the command. This is what the user will type to run the command. (e.g. `/ping`)
- `description` - The description of the command. This is what the user will see in the command picker.
- `options` - An array of command options. These are the arguments that the user will provide to the command. (e.g. `/ping test: string`) We're still working on abstracting `options` into our own class, but for now you can use the raw JSON format. See the [Discord docs](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure) for more information.

Next, we define the `slashRun` method. This is the method that will be called when the command is run. It takes an interaction of the `CHAT_INPUT` type. We then reply to the interaction with the `hello world!` message.

### `slashRun`

The `slashRun` method is called when the command is run. It takes a single argument, the interaction. The interaction is an object which contains information about the interaction, such as the user who ran the command, the arguments they provided, and the channel the command was run in.

The `slashRun` method must return `Promise<void>`, once returned the command will be considered finished; in serverless environments this will kill the process. This allows you to run code after initially responding to the interaction. This is useful for doing things like sending follow-up messages or deferring the interaction to do a long-running task and editing the interaction later.

<details>
  <summary> Example of a command with follow-up messages </summary>

```ts
import { Command, type ChatInputInteraction } from '@disploy/framework';

export default class HeyCommand extends Command {
	public constructor() {
		super({
			name: 'hey',
			description: 'heyy!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		interaction.deferReply(); // Initial response

		await new Promise((resolve) => setTimeout(resolve, 2000));

		interaction.editReply({
			content: `Just wanted to say hey!`,
		}); // Follow up message

		// Command is implicitly returned here
	}
}
```

</details>
