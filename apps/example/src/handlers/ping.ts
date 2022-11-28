import type { ButtonHandler } from "disploy";

export default {
	customId: 'ping-:userId',

	async run(interaction) {
		const originalUser = await interaction.params.getUserParam('userId');
		const clicker = interaction.user;

		return void interaction.reply({
			content: `hello world!!!!!!!! (clicked by ${clicker}) [made by ${originalUser}]`,
		});
	},
} satisfies ButtonHandler;
