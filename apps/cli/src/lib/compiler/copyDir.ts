import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

export function copyDir(src: string, dest: string) {
  if (existsSync(src)) {
    if (statSync(src).isDirectory()) {
      if (!existsSync(dest)) {
        mkdirSync(dest);
      }
      readdirSync(src).forEach((file) => {
        copyDir(join(src, file), join(dest, file));
      });
    } else {
      copyFileSync(src, dest);
    }
  }
}
