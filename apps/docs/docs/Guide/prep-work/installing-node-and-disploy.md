---
sidebar_position: 1
---

# Installing Node.js and the Disploy toolchain

## Installing Node.js

Disploy requires Node.js version 18 or higher. You can download Node.js from [the official website](https://nodejs.org/en/), through [Volta](https://volta.sh/) or other alternatives.

We recommend using Volta, as it allows you to easily switch between Node.js versions. You can install Volta by running the following command:

```bash
# Install Volta (first time only)
curl https://get.volta.sh | bash

# Install Node.js v18
volta install node@18
```

## Installing Disploy

Disploy is available on [npm](https://www.npmjs.com/package/disploy). You can install it by running the following command:

```bash
npm install -g disploy
```
