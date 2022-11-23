import type { ButtonHandler } from 'disploy';

export default {
	customId: 'ping-:userId',

	async run(interaction) {
		return void interaction.reply({
			content: `hello world!!!!!!!! (clicked by ${interaction.user}) [made by <@${interaction.params.getParam('userId')}>]`,
		})
	}

} satisfies ButtonHandler;
