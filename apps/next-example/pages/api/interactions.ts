/* eslint-disable turbo/no-undeclared-env-vars */
import { ExampleApp } from "@disploy/example";
import { createNextAdapter } from "@disploy/framework";

export default createNextAdapter(
  new ExampleApp({
    clientID: process.env.CLIENT_ID!,
    publicKey: process.env.DISCORD_PUBLIC_KEY!,
    token: process.env.DISCORD_TOKEN!,
  })
);
