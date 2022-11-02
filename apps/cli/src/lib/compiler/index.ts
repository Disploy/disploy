import virtual from "@rollup/plugin-virtual";
import { rollup } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { CompilerAssets } from "./assets";
import { parseCommands } from "./comamnds";

function parseTarget(target: string) {
  switch (target) {
    case "cloudflare":
      return "cfWorkerEntry";
    default:
      throw new Error(`Unknown target: ${target}`);
  }
}

export async function Compile({
  main,
  target,
}: {
  main: string;
  target: string;
}) {
  const { commandVirts, commandArray } = await parseCommands(main);
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
