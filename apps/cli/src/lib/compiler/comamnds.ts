import { glob } from "glob";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { logger } from "../../utils/logger";
import { CompilerAssets } from "./assets";

export async function parseCommands(root: string) {
  const commandsDir = path.join(root, "commands");

  const commandsFiles = await new Promise<string[]>((resolve, reject) => {
    glob(`${commandsDir}/**/*.js`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  logger.debug(commandsFiles, "Commands files");

  const commands = await Promise.all(
    commandsFiles.map(async (file) => {
      const code = await readFile(file, "utf-8");
      const commandName = path.basename(file, ".js");

      return code.replace(
        /export default class ([a-zA-Z0-9]+) /,
        `export class ${commandName} `
      );
    })
  );

  const commandVirts = commandsFiles.reduce((acc, file) => {
    // @ts-ignore
    acc[path.basename(file, ".js")] = commands[commandsFiles.indexOf(file)];
    return acc;
  }, {});

  const commandArray = CompilerAssets.commandArray({
    imports: commandsFiles
      .map(
        (file) =>
          `import {${path.basename(file, ".js")}} from "${path.basename(
            file,
            ".js"
          )}";`
      )
      .join("\n"),
    array: commandsFiles.map((file) => path.basename(file, ".js")).join(",\n"),
  });

  return { commandVirts, commandArray };
}
