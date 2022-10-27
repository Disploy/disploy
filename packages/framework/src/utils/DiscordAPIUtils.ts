import type {
  APIChatInputApplicationCommandInteraction,
  APIUser,
} from "discord-api-types/v10";

/**
 * Resolves a user from an interaction from `.user` or `.member.user`
 * @param raw The raw interaction data.
 * @returns The user object, if it exists.
 */
function resolveUserFromInteraction(
  raw: APIChatInputApplicationCommandInteraction
): APIUser | null {
  return raw.member?.user ?? raw.user ?? null;
}

export const DiscordAPIUtils = {
  resolveUserFromInteraction,
};
