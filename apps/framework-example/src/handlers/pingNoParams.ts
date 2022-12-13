import type { ButtonHandler } from 'disploy';

export default {
	customId: 'ping',

	async run(interaction) {
		const reply = await interaction.reply(
			{
				content: `hello world!!!!!!!! (clicked by ${interaction.user})`,
				allowed_mentions: {
					users: [],
				},
			},
			true,
		);

		interaction.followUp({
			content: `this is a followup message for [this interaction](${reply.url()}) it took ${
				reply.timestamp - interaction.createdTimestamp
			}ms to send`,
		});
	},
} satisfies ButtonHandler;
