import { Starter } from "./Starter";
import type { GitStarterDatabaseResponse } from "./types";

export class GitStarterDatabase {
  public type!: string;
  public base!: string;
  public repo!: string;
  public starters!: Starter[];
  public startersPath!: string;

  constructor(data: GitStarterDatabaseResponse) {
    this.type = data.type;
    this.base = data.base;
    this.repo = data.repo;
    this.startersPath = `${this.base}`;
    this.starters = data.starters.map((starter) => new Starter(this, starter));
  }
}
