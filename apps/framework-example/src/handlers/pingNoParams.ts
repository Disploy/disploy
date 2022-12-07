import type { ButtonHandler } from 'disploy';

export default {
	customId: 'ping',

	async run(interaction) {
		return void interaction.reply({
			content: `hello world!!!!!!!! (clicked by ${interaction.user})`,
			allowed_mentions: {
				users: [],
			},
		});
	},
} satisfies ButtonHandler;
