import type { Command } from 'disploy';

export default {
	name: 'ping',
	description: 'pong!',

	async run(interaction) {
		const reply = await interaction.deferReply({ fetchReply: true });

		return void interaction.editReply({
			content: `ok (in ${reply.timestamp - interaction.createdTimestamp}ms)`,
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: 'Click me!',
							style: 1,
							custom_id: `ping-${interaction.user.id}`,
						},
						{
							type: 2,
							label: 'i have no params',
							style: 2,
							emoji: {
								name: '🫢',
							},
							custom_id: `ping`,
						},
					],
				},
			],
		});
	},
} satisfies Command;
