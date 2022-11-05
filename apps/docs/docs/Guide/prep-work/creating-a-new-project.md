---
sidebar_position: 2
---

# Creating a new project

The Disploy toolchain allows you to create a new project using the Disploy Framework by running the following command:

```bash
disploy new
```

This will create a new project in the current directory. You can also specify a directory to create the project in by running the following command:

```bash
disploy new my-project
```

This will create a new project in the `my-project` directory.

## Project structure

```
├── commands # Commands
│   └── ping.ts # Ping command
├── index.ts # Empty file to make TypeScript not compile each folder as a separate module
```
