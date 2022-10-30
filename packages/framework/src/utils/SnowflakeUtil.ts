export class SnowflakeUtil {
  /**
   * Converts a snowflake to a binary string.
   * @param sf Snowflake
   * @returns Binary representation of the snowflake
   * @credit https://github.com/discordjs/discord.js/blob/5ec04e077bbbb9799f3ef135cade84b77346ef20/src/util/SnowflakeUtil.js#62
   */
  public static toBinary(sf: string): string {
    let bin = "";
    let high = parseInt(sf.slice(0, -10)) || 0;
    let low = parseInt(sf.slice(-10));
    while (low > 0 || high > 0) {
      bin = String(low & 1) + bin;
      low = Math.floor(low / 2);
      if (high > 0) {
        low += 5_000_000_000 * (high % 2);
        high = Math.floor(high / 2);
      }
    }
    return bin;
  }

  /**
   * Converts a snowflake to a timestamp.
   * @param sf Snowflake
   * @returns Timestamp of the snowflake
   */
  public static toTimestamp(sf: string): number {
    const BINARY = this.toBinary(sf).toString().padStart(64, "0");

    return parseInt(BINARY.substring(0, 42), 2) + 1_420_070_400_000;
  }
}
