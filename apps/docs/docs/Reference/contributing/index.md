# Contributing

Thanks for your consideration to contribute to Disploy 💙
We respect and appreciate all contributions, no matter how large or small.

## Projects

The Disploy ecosystem includes a number of repositories within the [Disploy](https://github.com/Disploy) organisation.

When it comes to contributions, repositories vary in scope, use different programming languages, and have varying levels of difficulty.

Here's a quick comparison to help you decide which repository might be the best to start contributing to (and/or is of interest to you):

<!-- | Repository                                                                       | Scope | Language   | Difficulty |
| -------------------------------------------------------------------------------- | ----- | ---------- | ---------- |
| [disploy](https://github.com/Disploy/disploy/tree/main/packages/disploy)         | Core  | TypeScript | Easy       |
| [disploy/cli](https://github.com/Disploy/disploy/tree/main/packages/disploy/cli) | CLI   | TypeScript | Hard       | -->

### [`disploy`]

The core of Disploy, written in TypeScript. This package is responsible for the core functionality of Disploy, think of it as the "engine" of Disploy. If you come from a web development background, this is the equivalent of the React library, but it also includes a framework that would be the equivalent of Next.js. This package is the most important package in the Disploy ecosystem, and is the one that is most likely to be used by the majority of users.

### [`disploy/cli`]

This package, is not a "real package" it lives in a folder of the [`deploy`] package since it interfaces with the core and wouldn't make sense to be a separate package. This package is responsible for the CLI of Disploy, it's written in TypeScript and is the package that is used to run the `disploy` command in your terminal. The main purpose of this package is to bundle bots made with Disploy into a single ["entry point"] that can be either imported with a [standalone "entry point"] or deployed straight to Cloudflare Workers with a ["entry point" made for Cloudflare Workers]. It's completely [optional](/docs/Reference/framework-less/) to use this package, but it's highly recommended since it makes it easier to deploy your bots.

[`disploy`]: https://github.com/Disploy/disploy/tree/main/packages/disploy
[`disploy/cli`]: https://github.com/Disploy/disploy/tree/main/packages/disploy/cli
["entry point"]: https://github.com/Disploy/disploy/tree/main/packages/disploy/cli/assets/code
[standalone "entry point"]: https://github.com/Disploy/disploy/blob/main/packages/disploy/cli/assets/code/standaloneEntry.js
["entry point" made for cloudflare workers]: https://github.com/Disploy/disploy/blob/main/packages/disploy/cli/assets/code/cfWorkerEntry.js
