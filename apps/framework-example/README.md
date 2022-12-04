# `@disploy/framework-example`

This is an example Discord bot made with Disploy to test the library.

## Usage

You should be already running `yarn dev` in the root of the repository (live transpile TypeScript), then you can deploy this bot to a Cloudflare Worker with:

```bash
yarn disploy deploy
```

or just run a local dev server with an ngrok tunnel:

```bash
yarn disploy dev
```

Commands will be automatically registered when running `yarn disploy dev`, but you'll need to manually register them when deploying to a Cloudflare Worker (`yarn disploy sync`).
