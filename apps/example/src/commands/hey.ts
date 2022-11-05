import { Command, type ChatInputInteraction } from '@disploy/framework';

export default class HeyCommand extends Command {
	public constructor() {
		super({
			name: 'hey',
			description: 'heyy!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		interaction.deferReply();

		await new Promise((resolve) => setTimeout(resolve, 2000));

		return void interaction.editReply({
			content: `Just wanted to say hey!`,
		});
	}
}
