---
sidebar_position: 4
---

# Deploying

Disploy allows you to deploy your Discord application to your target of choice expressed in the `disploy.json` file. We currently only support deploying to [Cloudflare Workers](https://workers.cloudflare.com/).

## Deploying to Cloudflare Workers

To deploy to Cloudflare Workers, you need to have a Cloudflare account, a Cloudflare Workers subscription and [wrangler](https://developers.cloudflare.com/workers/wrangler/) installed and configured.

- You can sign up for a Cloudflare account [here](https://dash.cloudflare.com/sign-up).
- Sign up for a Cloudflare Workers subscription [here](https://dash.cloudflare.com/sign-up/workers) (you can sign up for a free Workers subscription with [limited usage](https://developers.cloudflare.com/workers/platform/pricing), 100,000 requests per day).
- Install wrangler via npm by running the following command:

```bash
npm install -g wrangler
```

- Configure wrangler by running the following command:

```bash
wrangler login
```

Once you have a Cloudflare account and a Cloudflare Workers subscription, you can deploy your Discord application by running the following command:

```bash
$ disploy deploy
```

This will deploy your Discord application to a Cloudflare Worker defined in the `disploy.json` file.

```json
{
	"prebuild": "yarn run build",
	"root": "dist",
	"target": {
		"type": "cloudflare",
		"name": "cf-example" // The name of your Cloudflare Worker
	}
}
```

### Configuring environment variables

You will need to configure the following environment variables in your Cloudflare Worker:

- `CLIENT_ID`: The client ID of your Discord application.
- `PUBLIC_KEY`: The public key of your Discord application.
- `TOKEN`: The token of your Discord application.

You can find the client ID, public key and token of your Discord application in the [Discord Developer Portal](https://discord.com/developers/applications).

<details>
    <summary> Click to see how to find the client ID, public key and token of your Discord application </summary>

![](https://cdn.discordapp.com/attachments/1038456602610651196/1038456753672695848/id-and-pubkey.png)

![](https://cdn.discordapp.com/attachments/1038456602610651196/1038456754436063332/token.png)

</details>

You can configure environment variables in your Cloudflare Worker on the [Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers) by clicking on the name of your Cloudflare Worker, clicking on the "Settings" tab and then clicking on the "Environment" tab.

:::warning

Make sure to "Encrypt" the environment variables before saving them, this will stop `disploy deploy` from overwriting them.

:::

![](https://cdn.discordapp.com/attachments/1038456602610651196/1038456753316184094/cf-vars.png)

Finally you can set the HTTP interactions endpoint URL of your Discord application to the URL of your Cloudflare Worker. You can find the URL printed in the console when you run `disploy deploy` or by clicking on the name of your Cloudflare Worker on the [Workers dashboard](https://dash.cloudflare.com/?to=/:account/workers).

Make sure to set the HTTP interactions endpoint URL to the URL of your Cloudflare Worker with the `/interactions` path appended to it.

![](https://cdn.discordapp.com/attachments/1038456602610651196/1038456754125688903/interactions-endpoint.png)
