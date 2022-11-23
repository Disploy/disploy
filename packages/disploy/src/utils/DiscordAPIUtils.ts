import type { APIInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { User } from '../structs';

/**
 * Resolves a user from an interaction from `.user` or `.member.user`
 * @param raw The raw interaction data.
 * @returns The user structure from Disploy, if it exists.
 */
function resolveUserFromInteraction(app: App, raw: APIInteraction): User {
	let attemptedUser: User | null;

	if (raw.member) {
		attemptedUser = raw.member.user ? new User(app, raw.member.user) : null;
	} else {
		attemptedUser = raw.user ? new User(app, raw.user) : null;
	}

	if (!attemptedUser) {
		throw new Error('Could not resolve user from interaction.');
	}

	return attemptedUser;
}

export const DiscordAPIUtils = {
	resolveUserFromInteraction,
};
