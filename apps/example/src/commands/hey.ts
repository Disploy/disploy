import type { Command } from 'disploy';

export default {
	name: 'hey',
	description: 'heyy!',
	
	async run(interaction) {
		interaction.deferReply();

		await new Promise((resolve) => setTimeout(resolve, 2000));

		return void interaction.editReply({
			content: `Just wanted to say hey!`,
		});
	}
} satisfies Command;
