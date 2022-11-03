import { mkdir, rm, writeFile } from "fs/promises";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { logger } from "../../utils/logger";
import type { DisployConfig } from "../disployConf";
import { CompilerAssets } from "./assets";
import { parseCommands } from "./comamnds";
import { TempDir } from "./constants";
import { copyDir } from "./copyDir";

function parseTarget(target: DisployConfig["target"]) {
  switch (target) {
    case "cloudflare":
      return "cfWorkerEntry";
    case "standalone":
      return "standaloneEntry";
    default:
      throw new Error(`Unknown target: ${target}`);
  }
}

export async function Compile({
  root,
  target,
}: {
  root: string;
  target: DisployConfig["target"];
}) {
  await rm(TempDir, { recursive: true, force: true });
  await mkdir(TempDir, { recursive: true });

  logger.debug("Copying project files to temp dir...");
  const workbenchDir = `${TempDir}/workbench`;

  await mkdir(workbenchDir, { recursive: true });
  copyDir(root, workbenchDir);

  await parseCommands(workbenchDir);
  const entry = parseTarget(target);

  await writeFile(`${workbenchDir}/entry.js`, CompilerAssets[entry]());

  const bundle = await rollup({
    input: `${workbenchDir}/entry.js`,
    plugins: [
      // @ts-ignore - Plugin types mismatch

      esbuild({
        platform: "neutral",
        treeShaking: true,
      }),
    ],
    external: ["@disploy/framework"],
  });

  await bundle.write({
    file: `${TempDir}/entry.mjs`,
    format: "es",
  });

  await rm(workbenchDir, { recursive: true, force: true });
}
