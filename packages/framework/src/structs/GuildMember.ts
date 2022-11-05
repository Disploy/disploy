import type { APIGuildMember } from "discord-api-types/v10";
import { User } from "./User";
import {PartialGuildMember} from "./PartialGuildMember";

export class GuildMember extends PartialGuildMember {
  /**
   * The User object of the member.
   */
  public user!: User | null;

  /**
   * Whether the user is deafened in voice channels
   */
  public deaf!: boolean | null;

  /**
   * Whether the user is muted in voice channels
   */
  public mute!: boolean | null;

  public constructor(raw: APIGuildMember) {
    super(raw);
    this.user = raw.user ? new User(raw.user) : null;
    this.deaf = raw.deaf ? Boolean(raw.deaf) : null;
    this.mute = raw.mute ? Boolean(raw.mute) : null;
  }
}
