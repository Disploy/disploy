import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import type { ChatInputInteraction, Command } from 'disploy';

export default {
	name: 'member',
	description: 'fetch a member in a guild!',
	options: [
		{
			name: 'member',
			description: 'the user to fetch as a member',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
	],

	async run(interaction: ChatInputInteraction) {
		interaction.deferReply();
		if (!interaction.guild) {
			return void interaction.editReply({
				content: 'run me in a guild!',
			});
		}
		const partialMember = interaction.options.getUser('member');
		const member = await (await interaction.guild.fetch()).members.fetch(partialMember.id).catch(() => null);
		if (!member) {
			return void interaction.editReply({
				content: 'that user is not in this guild!',
			});
		}

		return void interaction.editReply({
			content: [
				`**Tag**: ${member.user.tag}`,
				`**ID**: ${member.user.id}`,
				`**Username:** ${member.user.username}`,
				`**Discriminator**: ${member.user.discriminator}`,
				`**Nickname**: ${member.nickname ?? 'None'}`,
				`**Deafened:** ${member.deaf ? 'yes' : 'no'}`,
				`**Muted:** ${member.mute ? 'yes' : 'no'}`,
				`**Nickname:** ${member.nickname ?? 'none'}`,
				`**Joined At:** ${member.joinedAt}`,
			].join('\n'),
		});
	},
} satisfies Command;
