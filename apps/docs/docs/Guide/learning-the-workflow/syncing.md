---
sidebar_position: 3
---

# Syncing commands

Disploy allows you to sync commands to your Discord application by running the following command:

```bash
$ disploy sync
```

This will give you a choice to merge or overwrite the commands in your Discord application with the commands in your project. If you choose to merge, Disploy will only add new commands and update existing commands. If you choose to overwrite, Disploy will delete all commands in your Discord application and add the commands in your project.

## Syncing commands in development mode

When you run `disploy dev`, Disploy will automatically sync commands to your Discord application. This means that you don't have to run `disploy sync` manually.
