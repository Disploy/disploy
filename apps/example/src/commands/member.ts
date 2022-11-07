import { Command, type ChatInputInteraction } from '@disploy/framework';
import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export default class PingCommand extends Command {
	public constructor() {
		super({
			name: 'member',
			description: 'fetch a member in a guild!',
			options: [
				{
					name: 'member',
					description: 'the user id to fetch as a member',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
		interaction.deferReply();

		try {
			const userId = interaction.options.getString('member');
			const guild = await interaction.guild?.fetch();

			if (!guild) {
				return void interaction.editReply({
					content: 'run me in a guild!',
				});
			}

			const member = await guild.members.fetch(userId);

			return void interaction.editReply({
				content: [
					`**User:** ${member.user.name}#${member.user.discriminator}`,
					`**Deafened:** ${member.deaf ? 'yes' : 'no'}`,
					`**Muted:** ${member.mute ? 'yes' : 'no'}`,
					`**Nickname:** ${member.nickname ?? 'none'}`,
					`**Joined At:** ${member.joinedAt}`,
				].join('\n'),
			});
		} catch (error) {
			const err = error as Error;
			return void interaction.editReply({
				content: ['```js', err.stack ?? err.message, '```'].join('\n'),
			});
		}
	}
}
