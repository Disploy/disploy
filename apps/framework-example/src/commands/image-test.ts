import { ApplicationCommandOptionType, MessageFlags } from 'discord-api-types/v10';
import type { ChatInputInteraction, Command } from 'disploy';

export default {
	name: 'image-test',
	description: 'test an image',
	options: [
		{
			name: 'image',
			description: 'your image',
			type: ApplicationCommandOptionType.Attachment,
			required: true,
		},
	],

	async run(interaction: ChatInputInteraction) {
		const attachment = interaction.options.getAttachment('image');

		if (attachment.contentType !== 'image/png') {
			return void interaction.reply({
				content: 'that is not a png!',
				flags: MessageFlags.Ephemeral,
			});
		}

		return void interaction.reply({
			embeds: [
				{
					title: 'your image',
					image: {
						url: attachment.url,
					},
				},
			],
		});
	},
} satisfies Command;
