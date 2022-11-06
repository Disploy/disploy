import { Command, type ChatInputInteraction } from '@disploy/framework';

export default class HeyCommand extends Command {
	public constructor() {
		super({
			name: 'hey',
			description: 'heyy!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		if (!interaction.guild) {
			return interaction.reply({ content: 'You are not in a guild.' });
		}

		interaction.deferReply();

		const guild = await interaction.guild.fetch();

		return void interaction.editReply({
			content: `Hello the people of ${guild.name}!`,
		});
	}
}
