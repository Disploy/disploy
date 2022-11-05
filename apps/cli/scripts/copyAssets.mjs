import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

const copy = (src, dest) => {
  if (existsSync(src)) {
    if (statSync(src).isDirectory()) {
      if (!existsSync(dest)) {
        mkdirSync(dest);
      }
      readdirSync(src).forEach((file) => {
        copy(join(src, file), join(dest, file));
      });
    } else {
      copyFileSync(src, dest);
    }
  }
};

copy("./assets", "./dist/assets");
