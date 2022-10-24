import { tw } from "@meetuplol/typewriter";
import esbuild from "rollup-plugin-esbuild";

const bundle = (input, config) => ({
  ...config,
  input,
  external: (id) => !/^[./]/.test(id),
});

const config = [
  bundle("src/index.ts", {
    plugins: [
      esbuild({
        platform: "node",
      }),
      tw(),
    ],
    output: [
      {
        file: `dist/index.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/index.mjs`,
        format: "es",
        sourcemap: true,
      },
    ],
  }),
];

export default config;
