import type { Argv, CommandModule } from "yargs";
import { StartersEndpoint, StartersApiEndpoint } from "../Constants";
import fs from "fs"
import tar from "tar"
import { UserError } from "../lib/UserError";
import { green } from "colorette"
import ora from "ora"
import inquirer from "inquirer";
import type { StarterSchema } from "../types";

export const desc: string = "Initialize a new project";

const tempFilename = ".__disploy_tmp.tar.gz"

export const builder = (yargs: Argv) => yargs.options({});

async function handler() {
    let data = await (await fetch(StartersApiEndpoint)).json();
    let schema: StarterSchema = await (await fetch(StartersEndpoint)).json()

    let response = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'template',
                message: 'Which template would you like to use',
                choices: schema.starters.map(x => `${x.name} -- ${x.description}`),
            },
        ])

    let assetURL: string = data.tarball_url
    if (!assetURL) throw new UserError("Unable to fetch latest release", true)

    const downloadingSpinner = ora("Downloading file").start()
    let body = await (await fetch(assetURL)).arrayBuffer()
    downloadingSpinner.succeed("File downloaded")

    const writingSpinner = ora(`Writing to ${green(tempFilename)}`).start()
    fs.writeFileSync(tempFilename, Buffer.from(body))
    writingSpinner.succeed(`Wrote to ${green(tempFilename)}`)

    const extractingSpinner = ora(`Extracting tar`).start()
    await tar.x({ file: tempFilename, strip: 1 })
    extractingSpinner.succeed("Extracted tar file")

    const cleaningSpinner = ora(`Cleaning up artifact: ${green(tempFilename)}`)
    fs.rmSync(tempFilename)
    cleaningSpinner.succeed("Cleaned up artifacts")
}

export const NewCommand: CommandModule = {
    aliases: [],
    builder,
    command: "new",
    handler,
};