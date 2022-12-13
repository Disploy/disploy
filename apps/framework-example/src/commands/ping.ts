import { ButtonStyle, ComponentType } from 'discord-api-types/v10';
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
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							label: 'Click me!',
							style: ButtonStyle.Primary,
							custom_id: `ping-${interaction.user.id}`,
						},
						{
							type: ComponentType.Button,
							label: 'i have no params',
							style: ButtonStyle.Secondary,
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
