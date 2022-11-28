import type { Command } from 'disploy';

export default {
	name: 'hey',
	description: 'heyy!',
	
	async run(interaction) {
		interaction.deferReply();

		if (!interaction.guild) {
			return void interaction.editReply({
				content: "You must use this in a guild."
			})
		}

		const guild = await interaction.guild.fetch();

		return void interaction.editReply({
			content: `Hello the people of ${guild.name}!`,
		});
	}
} satisfies Command;
