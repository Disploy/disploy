# `@disploy/example`

This is an example Discord bot made with Disploy to test the library.

## Usage

You should be already running `yarn dev` in the root of the repository (live transpile TypeScript), then you can run this bot with:

```bash
yarn workspace @disploy/example start --sync # Sync will register commands with Discord, you should only need to add this flag once, or when you add new commands
```

Next you will need to make the interaction server available to Discord. You can do this by using a service like [ngrok](https://ngrok.com/) or [Cloudflare tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/).

```bash
ngrok http 3000
```

Set the `INTERACTIONS ENDPOINT URL` to https://xxxx-xx-xxx-xxx-xx.ngrok.io/interaction in the Discord Developer Portal.

### Required environment variables

- `DISCORD_CLIENT_ID`: The Discord application client ID
- `DISCORD_TOKEN`: The Discord bot token
- `DISCORD_PUBLIC_KEY`: The Discord application public key

We recommend using [env-cmd](https://www.npmjs.com/package/env-cmd) to load environment variables from a `.env` file.
