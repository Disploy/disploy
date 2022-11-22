import type { Command } from 'disploy';

export default {
	name: 'ping',
	description: 'pong!',

	async run(interaction) {
		return void interaction.reply({
			content: 'hello world!!!!!!!!',
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: 'Click me!',
							style: 1,
							custom_id: 'ping',
						},
					],
				},
			],
		})
	}

} satisfies Command;