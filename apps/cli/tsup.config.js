import { createTsupConfig } from "../../tsup.config.js";

export default createTsupConfig({
  entry: ["src/disploy.ts"],
  format: ["esm"],
});
