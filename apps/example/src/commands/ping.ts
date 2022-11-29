import type { Command } from 'disploy';

const Command: Command = {
	name: 'ping',
	description: 'Ping the bot',

	run(interaction) {
		interaction.reply({
			content: 'Pong!',
		});
	},
};

export default Command;
