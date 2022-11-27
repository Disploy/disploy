import type { APIContextMenuInteraction, Snowflake } from 'discord-api-types/v10';
import type { App } from '../client';
import { CommandInteraction } from './CommandInteraction';

export class ContextMenuInteraction extends CommandInteraction {
	/**
	 * The ID of the target.
	 */
	public targetId: Snowflake;

	public constructor(app: App, public override raw: APIContextMenuInteraction) {
		super(app, raw);
		this.targetId = raw.data.target_id;
	}
}
