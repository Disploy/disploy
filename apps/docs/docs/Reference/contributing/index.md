# Contributing

Thanks for your consideration to contribute to Disploy 💙
We respect and appreciate all contributions, no matter how large or small.

## Projects

The Disploy ecosystem includes a number of repositories within the [Disploy organisation](https://github.com/Disploy).

When it comes to contributions, repositories vary in scope, use different programming languages, and have varying levels of difficulty.

Here's a quick comparison to help you decide which repository might be the best to start contributing to (and/or is of interest to you):

| Repository      | Scope | Language   | Difficulty |
| --------------- | ----- | ---------- | ---------- |
| [`disploy`]     | Core  | TypeScript | Easy       |
| [`disploy/cli`] | CLI   | TypeScript | Hard       |

### [`disploy`]

The core of Disploy, written in TypeScript. This package is responsible for the core functionality of Disploy; think of it as the "engine" of Disploy. It is not a server, the user of the library must implement their own idea of a server. This allows Disploy to be used in a variety of different environments, such as Node.js, Deno, and edge function platforms like Cloudflare Workers.

### [`disploy/cli`]

This package is not a "real package" as it lives in a folder of the [`disploy`] package since it interfaces with [`disploy`] it self and wouldn't make sense to be a separate package due to version mismatches. This package is what makes the "CLI Framework" of Disploy; it's written in TypeScript and is the package used to run the `disploy` command in your terminal. The main purpose of this package is to take in commands, handlers and more and transform them into a single ["entry point"] that can be either imported with a [standalone "entry point"] or deployed straight to Cloudflare Workers with a ["entry point" made for Cloudflare Workers]. It's completely [optional](/docs/Reference/framework-less/) to use this package, it's just a convenience package to make it easier to create simple but powerful bots.

### [`create-disploy-app`]

todo

[`disploy`]: https://github.com/Disploy/disploy/tree/main/packages/disploy
[`disploy/cli`]: https://github.com/Disploy/disploy/tree/main/packages/disploy/cli
["entry point"]: https://github.com/Disploy/disploy/tree/main/packages/disploy/cli/assets/code
[standalone "entry point"]: https://github.com/Disploy/disploy/blob/main/packages/disploy/cli/assets/code/standaloneEntry.js
["entry point" made for cloudflare workers]: https://github.com/Disploy/disploy/blob/main/packages/disploy/cli/assets/code/cfWorkerEntry.js
[`create-disploy-app`]: https://github.com/Disploy/create-disploy-app
