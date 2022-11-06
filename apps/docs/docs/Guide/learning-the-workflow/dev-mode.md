---
sidebar_position: 2
---

# Entering development mode

Disploy allows you to enter development mode by running the following command:

```bash
$ disploy dev

Your bot is ready to receive interactions!
1. Visit https://discord.com/developers/applications/1033202906385625180/information
2. Set INTERACTIONS ENDPOINT URL to https://xxxx-xx-xxx-xxx-xx.ngrok.io/interactions
```

This will start a development server exposed to the web with a reverse-tunnel powered by ngrok that will automatically load changes when you make changes to your code.

:::tip

When using TypeScript, you will need to run `tsc --watch` in a separate terminal window to compile your code. Disploy will automatically restart when you make changes to your compiled code.

:::
