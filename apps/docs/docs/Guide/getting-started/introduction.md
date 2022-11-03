---
sidebar_position: 1
---

# Introduction

Disploy is a whole ecosystem of tools to help you create your next Discord HTTP Interaction bot.
We are going for a Next.js like experience, with file based routing and a lot of features to help you create your bot.

### CLI

- Bootstrapping a new project
- Development server that automatically exposed to the internet using ngrok or Cloudflare tunnel
- Rolling up a production build using rollup and deploying to the edge (Vercel, Cloudflare workers, etc)

### Framework

The Disploy [framework](/docs/Documentation/framework) will be a batteries-included framework that will feel like writing an Next.js app but instead you're making a Discord application, it will include internally a wrapper of the Discord API; turning raw API objects into classes and providing a nice interface to work with, interaction routing and more, while on the outside API; exposing a command and message component framework. The framework is not a server; rather it has a [Router](/docs/Documentation/framework/classes/Router) that takes in requests from the `entry` [method](/docs/Documentation/framework/classes/Router#entry) and handles the request accordingly.

```ts
// Example command
import { Command, type ChatInputInteraction } from "@disploy/framework";

export default class HeyCommand extends Command {
  public constructor() {
    super({
      name: "hey",
      description: "heyy!",
    });
  }

  override async slashRun(interaction: ChatInputInteraction) {
    return void interaction.reply({
      content: `heyy!`,
    });
  }
}
```

### Testing

`@disploy/disbench` will be a testing library that will allow you to test your bot in a similar way to how you would test a web app with a mocked Discord API.

Example usage (this is not final):

```ts
// Disbench demo snippet (fake code)
import { Disbench } from "@disploy/disbench";

const disbench = new Disbench({
  app: "dist/bot.js",
});

await disbench.setup(); // This will start the bot and start communicating with the framework to "deploy" commands to the mocked API

const echoCommand = disbench.commands.find({ name: "echo" });

const response = await disbench.interact(echoCommand, {
  options: {
    message: "Hello World!",
  },
});

expect(response).toEqual("Hello World!");
```

---

https://discord.gg/E3z8MDnTWn
