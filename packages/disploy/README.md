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

Disploy is a framework for building Discord bots with ease. It's designed to make it easy to build, test and deploy Discord bots.

## It's as easy as 1, 2, 3, 4

### #1

```bash
npx create-disploy-app@latest
# or
yarn create disploy-app
# or
pnpm create disploy-app
```

### #2

```ts
// Example command
import { Command, type ChatInputInteraction } from 'disploy';

export default class HeyCommand extends Command {
	public constructor() {
		super({
			name: 'hey',
			description: 'heyy!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		return void interaction.reply({
			content: `heyy!`,
		});
	}
}
```

### #3

```bash
disploy dev # test your bot locally with hot-reloading and tunneling
```

### #4

```bash
disploy deploy # deploy your bot to Cloudflare Workers
```

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
