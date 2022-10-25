# Disploy

Disploy is a whole ecosystem of tools to help you create your next Discord HTTP Interaction bot.

## Planned Features

Disploy was originally going to be a tool to template any Discord bot, but I decided to repurpose it to be a tool to help you create HTTP Interaction bots.

### CLI

- Bootstrapping a new project
- Development server that automatically exposed to the internet using ngrok or cloudflare tunnel
- Rolling up a production build using rollup and deploying to the edge (vercel, cloudflare workers, etc)

### Core

The core library will be a wrapper of the Discord API and nothing more, turning raw API objects into classes and providing a nice interface to work with.

### Framework

The framework will be a batteries included framework that will feel like writing an Angular/Laravel app but instead you're making a discord application, it will include internally interaction handling, routing and more, while on the outside having a command and event handler framework. Simply use an adapter to connect to your favorite web framework.

```ts
// Express adapter showcase snippet (real code)
import { App, expressAdapter } from "@disploy/framework";
import bodyParser from "body-parser";
import express from "express";

const server = express();
server.use(bodyParser.json());

const app = new App();

expressAdapter(app, server);

server.listen(3000, () => {
  console.log("🚀 Express server is running on port 3000");
});
```

Commands and events will feel similar to how sapphire's discord.js framework feels, with decorators and file system module injecting. 

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