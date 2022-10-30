# Cloudflare Disploy Example

Implements the [Disploy example bot](https://github.com/Disploy/disploy/blob/main/apps/example) for Cloudflare Workers.

## Environment Variables

You need to set the following environment variables:

> 💡 You can use `wrangler secret put <name>` to set these values.

| Name                 | Description                 |
| -------------------- | --------------------------- |
| `CLIENT_ID`          | The client ID of your bot.  |
| `DISCORD_PUBLIC_KEY` | The public key of your bot. |
| `DISCORD_TOKEN`      | The bot token of your bot.  |
