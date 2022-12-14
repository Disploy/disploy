# Intro

> Firstly, thank you so much for your consideration in contributing to Disploy. 💙

Disploy uses Turborepo to manage our monorepo which we're using yarn to manage our dependencies with.
You must have yarn installed to work on Disploy.

Once installed run `yarn` at the root of the monorepo to install all our dependencies.

# Development

When working on Disploy it is recommended to use Node 18 and to run `yarn dev` in the root of the monorepo.
This will start watching your changes and compile TypeScript on the fly.

https://user-images.githubusercontent.com/69066026/197907414-7dcf6b84-e525-4471-b5d8-fc76597c9727.mp4

When testing your changes, you should cd into `apps/example` and run `yarn serve` to start a local Disploy development server with hot reloading, make sure to still have `yarn dev` running in the root of the monorepo.

## Secrets

We use `@meetuplol/envject` to inject environment variables from the root of the monorepo into our apps/examples. So make a `.env` in the root of the monorepo and not elsewhere.

# Conversation

We only use GitHub issues for bug reports and feature suggestions! If you have a question or want to chat about an issue or pull request, please keep it in a forum post on our Discord server. https://discord.gg/E3z8MDnTWn
