import type { Command } from 'disploy';

export default {
	name: 'env',
	description: 'test disploy envs!',

	async run(interaction) {
		return void interaction.reply({
			content: `The environment variable "TEST" is set to "${interaction.app.env.get('TEST') ?? 'undefined'}"`,
		});
	},
} satisfies Command;
