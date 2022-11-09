import { Command, type ChatInputInteraction } from 'disploy';

export default class PingCommand extends Command {
	public constructor() {
		super({
			name: 'ping',
			description: 'pong!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		return void interaction.reply({
			content: `hello world!!!!!!!!`,
		});
	}
}
