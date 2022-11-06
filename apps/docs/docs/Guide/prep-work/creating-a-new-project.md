---
sidebar_position: 2
---

# Creating a new project

:::warning

The `disploy new` command is not [yet implemented](https://github.com/Disploy/disploy/pull/31). You can find an example project [here](https://github.com/TeamEvie/Valor) for now.

:::

The Disploy toolchain allows you to create a new project using the Disploy Framework by running the following command:

```bash
disploy new
```

## Project structure

```
├── commands # Commands
│   └── ping.ts # Ping command
├── index.ts # Empty file to make TypeScript not compile each folder as a separate module
```
