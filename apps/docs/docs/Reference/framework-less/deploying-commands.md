---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploying commands

We can call `syncCommands` on our `CommandManager` attached to our `App` instance to deploy our commands to Discord.

```ts
import { app } from './main.mjs';

console.log(`Deploying ${app.commands.getCommands().size} commands...`);

app.commands.syncCommands(false); // false = replace existing commands deployed to Discord

console.log('Deployed!');
```
