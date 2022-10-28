# Disploy

Disploy is a whole ecosystem of tools to help you create your next Discord HTTP Interaction bot. It allows you to create an HTTP Interaction bot using your favourite web framework.

## Planned Features

When Disploy was originally started, it was supposed to be a tool to template any Discord bot, but I decided to repurpose it to be a tool to help you create HTTP Interaction bots.

### CLI

- Bootstrapping a new project
- Development server that automatically exposed to the internet using ngrok or Cloudflare tunnel
- Rolling up a production build using rollup and deploying to the edge (Vercel, Cloudflare workers, etc)

### Framework

The Disploy framework will be a batteries-included framework that will feel like writing an Angular/Laravel app but instead you're making a Discord application, it will include internally a wrapper of the Discord API; turning raw API objects into classes and providing a nice interface to work with, interaction routing and more, while on the outside API; exposing a command and message component framework. The framework is not a server; rather it takes an already existing web server implementation and adapts to it.

```ts
// Express adapter showcase snippet (real code)
// You can find more implementation examples here https://github.com/Disploy/disploy/tree/main/apps/example#implementations
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

Commands and events will feel similar to how sapphire's discord.js framework feels, with decorators and file system modules injecting.

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
