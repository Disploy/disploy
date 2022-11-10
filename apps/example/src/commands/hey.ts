import type { Command } from 'disploy';

export default {
	name: 'hey',
	description: 'heyy!',
	
	async run(interaction) {
		interaction.deferReply();

		const guild = await interaction.guild.fetch();

		return void interaction.editReply({
			content: `Hello the people of ${guild.name}!`,
		});
	}
} satisfies Command;
