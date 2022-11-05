# Disploy Framework

The Disploy Framework is a Discord interactions framework. Think of Disploy as Next.js for Discord applications. Apps built with Disploy are easy to develop, easy to deploy, and easy to maintain.

## Commands

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

Disploy Framework apps bring with a full toolchain for developing, deploying, and maintaining your Discord application.
You can learn more about the toolchain in the [Getting Started](/docs/Guide/getting-started/introduction) guide.
