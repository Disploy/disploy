import virtual from "@rollup/plugin-virtual";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import type { DisployConfig } from "../disployConf";
import { CompilerAssets } from "./assets";
import { parseCommands } from "./comamnds";

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
  const { commandVirts, commandArray } = await parseCommands(root);
  const entry = parseTarget(target);

  const bundle = await rollup({
    input: "entry",
    plugins: [
      // @ts-ignore - Plugin types mismatch
      virtual({
        ...commandVirts,
        commands: commandArray,
        entry: CompilerAssets[entry](),
      }),
      esbuild({
        platform: "neutral",
        treeShaking: true,
      }),
    ],
    external: ["@disploy/framework"],
  });

  await bundle.write({
    file: ".disploy/entry.mjs",
    format: "es",
  });
}
