import * as color from "colorette";

class Logger {
  public constructor(private readonly options: { debug: boolean }) {}

  private log(message: string, form: (text: string) => string, ...args: any[]) {
    console.log(form(message), ...args);
  }

  public debug(message: string, ...args: any[]) {
    if (!this.options.debug) return;

    this.log(message, color.cyan, ...args);
  }

  public info(message: string, ...args: any[]) {
    this.log(message, color.green, ...args);
  }

  public warn(message: string, ...args: any[]) {
    this.log(message, color.yellow, ...args);
  }

  public error(message: string, ...args: any[]) {
    this.log(message, color.red, ...args);
  }
}

export const logger = new Logger({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  debug: true,
});
