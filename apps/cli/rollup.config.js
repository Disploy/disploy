import esbuild from "rollup-plugin-esbuild";

const bundle = (input, config) => ({
  ...config,
  input,
  external: (id) => !/^[./]/.test(id),
});

const config = [
  bundle("src/disploy.ts", {
    plugins: [
      esbuild({
        platform: "node",
      }),
    ],
    output: [
      {
        file: `dist/disploy.js`,
        format: "cjs",
        sourcemap: true,
      },
    ],
  }),
];

export default config;
