# Disploy

Disploy is a whole ecosystem of tools to help you create your next Discord HTTP Interaction bot.

## Planned Features

Disploy was originally going to be a tool to template any Discord bot, but I decided to repurpose it to be a tool to help you create HTTP Interaction bots.

### CLI

- Bootstrapping a new project
- Development server that automatically exposed to the internet using ngrok or cloudflare tunnel
- Rolling up a production build using rollup and deploying to the edge (vercel, cloudflare workers, etc)

### Core

The core library will be a wrapper of the Discord API and nothing more, it's not final yet if this will exist or if we will just use `@discordjs/rest`.

### Framework

The framework will be a batteries included framework that will feel like writing an Angular/Laravel app, it will include interaction handling, routing, and more.

### Testing

`@disploy/disbench` will be a testing library that will allow you to test your bot in a similar way to how you would test a web app with a mocked Discord API.

Example usage (this is not final):

```ts
import { Disbench } from "@disploy/disbench";

const disbench = new Disbench({
  app: "dist/bot.js",
});

await disbench.setup(); // This will start the bot and start communicating with the framework to "deploy" commands to the mocked API

const commands = [disbench.commands.find({ name: "echo" })];

for (const command of commands) {
  const response = await disbench.interact(command, {
    options: {
      message: "Hello World!",
    },
  });

  expect(response).toEqual("Pong!");
}
```
