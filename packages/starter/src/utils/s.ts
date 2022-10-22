/**
 * # *s*~~hush~~
 * When in production, this function will make sure executed sub-processes *shush*.
 * using the power of `>> /dev/null`
 * @param cmd The command to format
 * @returns The formatted command
 */
export const s = (cmd: string) =>
  `${cmd} ${
    process.env.NODE_ENV === "Development" ? "" : " >> /dev/null 2>&1"
  }`;
