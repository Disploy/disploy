import axios from "axios";
import { ConsoleManager } from "../structs/ConsoleManager";
import { GitStarterDatabase } from "../structs/GitStarterDatabase";
import type { GitStarterDatabaseResponse } from "../structs/types";

export async function createGSDB(
  endpoint: string
): Promise<GitStarterDatabase> {
  try {
    const { log } = ConsoleManager;

    log(`[GitStarterDatabase] Fetching data from ${endpoint}`);
    const res = await axios.get<GitStarterDatabaseResponse>(endpoint);

    return new GitStarterDatabase(res.data);
  } catch (error) {
    throw error;
  }
}
