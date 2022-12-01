---
sidebar_position: 2
---

# Creating a new project

:::warning

`create-disploy-app` is not [yet implemented](https://github.com/Disploy/disploy/issues/50).

:::

```bash
npx create-disploy-app@latest
# or
yarn create disploy-app
# or
pnpm create disploy-app
```

## Project structure

```
├── commands # Commands
│   └── ping.ts # Ping command
├── index.ts # Empty file to make TypeScript not compile each folder as a separate module
```
