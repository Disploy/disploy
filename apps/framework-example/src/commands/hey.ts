import type { Command } from 'disploy';

export default {
	name: 'hey',
	description: 'heyy!',

	async run(interaction) {
		const reply = await interaction.deferReply({ fetchReply: true });

		if (!interaction.guild) {
			return void interaction.editReply({
				content: 'You must use this in a guild.',
			});
		}

		const guild = await interaction.guild.fetch();

		return void interaction.editReply({
			content: `Hello the people of ${guild.name}! Fun fact! The id of this message is \`${reply.id}\`!`,
		});
	},
} satisfies Command;
