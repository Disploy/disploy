import * as yargs from "yargs";

(async () => {
  yargs.commandDir("commands").demandCommand().argv;
})();
