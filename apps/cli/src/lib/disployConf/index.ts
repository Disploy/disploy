import { readFile } from "fs/promises";
import path from "path";
import { z } from "zod";

const disployConfigSchema = z.object({
  prebuild: z.string().optional(),
  root: z.string(),
  target: z.union([z.literal("cloudflare"), z.literal("standalone")]),
});

export type DisployConfig = z.infer<typeof disployConfigSchema>;

export async function readConfig(cwd: string): Promise<DisployConfig> {
  const file = await readFile(path.join(cwd, "disploy.json"), "utf-8");
  const config = await disployConfigSchema.parseAsync(JSON.parse(file));
  return config;
}
