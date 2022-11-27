import type { APIUserApplicationCommandInteraction } from 'discord-api-types/v10';
import type { App } from '../client';
import { ContextMenuInteraction } from './ContextMenuCommand';
import { User } from './User';

export class UserContextMenuInteraction extends ContextMenuInteraction {
	/**
	 * The target user.
	 */
	public readonly targetUser: User;

	public constructor(app: App, public override raw: APIUserApplicationCommandInteraction) {
		super(app, raw);

		const resolvedUser = raw.data.resolved.users[this.targetId]!;
		this.targetUser = new User(app, resolvedUser);
	}
}
