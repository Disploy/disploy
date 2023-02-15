---
sidebar_position: 2
---

# Creating a new project

You can bootstrap a new project using `create-disploy-app`:

```bash
npx create-disploy-app@latest
# or
yarn create disploy-app
# or
pnpm create disploy-app
```

> Make sure to select "Disploy CLI Framework (TypeScript)".

## Project structure

```
├── commands # Commands
│   └── ping.ts # Ping command
├── index.ts # Empty file to make TypeScript not compile each folder as a separate module
```
