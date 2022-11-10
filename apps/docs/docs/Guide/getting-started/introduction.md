---
sidebar_position: 1
---

# Introduction

:::warning

Disploy is currently in development. It is not ready for production use, but you can try it out and give us feedback.
You can view our [v1.0.0 milestone](https://github.com/Disploy/disploy/milestone/1) to see what features are planned for the first release and their current status.

:::

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
import type { Command } from 'disploy';

export default {
	name: 'hey',
	description: 'heyy!',

	async run(interaction) {
		return void interaction.editReply({
			content: `Just wanted to say hey!`,
		});
	}
} satisfies Command;
```

### #3

```bash
disploy dev # test your bot locally with hot-reloading and tunneling
```

### #4

```bash
disploy deploy # deploy your bot to Cloudflare Workers
```

This guide will walk you through the basics of Disploy, we recommend reading it from top to bottom. If you have any questions, feel free to ask in our [Discord server](https://discord.gg/E3z8MDnTWn).
