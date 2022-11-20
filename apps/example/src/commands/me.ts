import type { ChatInputInteraction, Command } from 'disploy';

export default {
	name: 'me',
	description: 'fetch me!',
	async run(interaction: ChatInputInteraction) {
		interaction.deferReply();

		try {
			const user = await interaction.app.user.fetch();

			return void interaction.editReply({
				embeds: [
					{
						title: 'User',
						description: `**Username**: ${user.name}\n**Discriminator**: ${user.discriminator}\n**ID**: ${user.id}`,
					},
				],
			});
		} catch (error) {
			const err = error as Error;
			return void interaction.editReply({
				content: ['```js', err.stack ?? err.message, '```'].join('\n'),
			});
		}
	},
} satisfies Command;