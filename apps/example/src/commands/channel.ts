import { ApplicationCommandOptionType, ChannelType } from 'discord-api-types/v10';
import { Command, type ChatInputInteraction } from 'disploy';
export default class ChannelCommand extends Command {
	public constructor() {
		super({
			name: 'channel',
			description: 'fetch a channel!',
			options: [
				{
					name: 'channel',
					description: 'the channel id to fetch',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		interaction.deferReply();

		try {
			const channelId = interaction.options.getString('channel');
			const channel = await interaction.app.channels.fetch(channelId);

			let message = `${channel.name} is `;

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
	}
}
