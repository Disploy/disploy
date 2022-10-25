# Intro

Firstly, thank you so much for your consideration in contributing to Disploy. 💙

---

Disploy uses Turborepo to manage our monorepo which we're using yarn to manage our dependencies with.
You must have yarn installed to work on Disploy.

Once installed run `yarn` at the root of the monorepo to install all our dependencies.

# Development

When working on Disploy it is recommended to use Node 18 and to run `yarn dev` in the root of the monorepo.
This will start watching your changes and compile TypeScript on the fly.

When testing, we recommend to use the next-example, this would have already started when you ran `yarn dev` and is either on port 3000 or 3001.
Otherwise we have an express-example you can run by opening another terminal, changing the directory to apps/express-example and running `yarn start`.

# Secrets

We use `@meetuplol/envject` to inject environment variables from the root of the monorepo into our apps/examples. So make a `.env` in the root of the monorepo and not elsewhere.
