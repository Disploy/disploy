import { ApplicationCommandOptionType, ChannelType } from 'discord-api-types/v10';
import type { Command } from 'disploy';

export default {
	name: 'channel',
	description: 'fetch a channel!',
	options: [
		{
			name: 'channel',
			description: 'the channel to fetch',
			type: ApplicationCommandOptionType.Channel,
			required: true,
		},
	],

	async run(interaction) {
		interaction.deferReply();

		try {
			const channel = interaction.options.getChannel('channel');

			let message = `${channel} is `;

			switch (channel.type) {
				case ChannelType.GuildVoice:
					message += 'a voice channel';
					break;
				case ChannelType.GuildText:
					message += 'a text channel';
					break;
			}

			return void interaction.editReply({
				content: message,
			});
		} catch (error) {
			const err = error as Error;
			return void interaction.editReply({
				content: ['```js', err.stack ?? err.message, '```'].join('\n'),
			});
		}
	},
} satisfies Command;
