---
sidebar_position: 5
---

# Deploying commands

We can call `syncCommands` on our `CommandManager` attached to our `App` instance to deploy our commands to Discord.

```js
import { app } from './main.mjs';

console.log(`Deploying ${app.commands.getCommands().size} commands...`);

app.commands.syncCommands(false); // false = replace existing commands deployed to Discord

console.log('Deployed!');
```
