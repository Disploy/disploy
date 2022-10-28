import type { APIGuildMember } from "discord-api-types/v10";
import { User } from "./User";

export class GuildMember {
  /**
   * The User object of the member.
   */
  public user!: User | null;

  /**
   * The nickname of the member.
   */
  public nickname!: string | null;

  public constructor(raw: APIGuildMember) {
    this.user = raw.user ? new User(raw.user) : null;
    this.nickname = raw.nick || null;
  }
}
