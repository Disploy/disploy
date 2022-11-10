
import type { Command } from 'disploy';

export default {
	name: 'ping',
	description: 'pong!',

	async run(interaction) {
		return void interaction.reply({
			content: 'hello world!!!!!!!!',
		})
	}

} satisfies Command;