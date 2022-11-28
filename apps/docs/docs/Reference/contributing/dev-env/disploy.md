# Disploy

This page will go over how to setup a development environment for Disploy.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher, we recommend using [volta](https://volta.sh/) to install)
- [Yarn](https://yarnpkg.com/) (use `volta install yarn` to install)
- Git
- A code editor that works well with TypeScript (we recommend [VSCode](https://code.visualstudio.com/))

## Setup

1. Clone the Disploy repository: `git clone https://github.com/Disploy/disploy`
2. Change directory to the Disploy repository: `cd disploy`
3. Install the dependencies: `yarn install`
4. Enter development mode: `yarn dev --filter=!@disploy/docs`
5. Open a new terminal and change directory to `apps/example` and run `yarn` for the first time, this will link the CLI's executable.
6. Make changes to the code and see them live transpile and type check in the first terminal.
7. For the first time make a new file called `.env` at the root of the repo, and fill it in with keys & values from `.env.example`
8. To run the example app, run `yarn workspace @disploy/example disploy dev`
