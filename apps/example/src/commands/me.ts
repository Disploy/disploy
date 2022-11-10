import { Command, type ChatInputInteraction } from 'disploy';

export default class PingCommand extends Command {
	public constructor() {
		super({
			name: 'me',
			description: 'fetch me!',
		});
	}

	override async slashRun(interaction: ChatInputInteraction) {
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
	}
}
