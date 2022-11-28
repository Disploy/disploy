import { ApplicationCommandOptionType,} from 'discord-api-types/v10';
import type { Command } from 'disploy';


export default {
	name: 'user',
	description: 'get info of a user',
	options: [
		{
			name: 'user',
			description: 'the user to get info of',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
	],
	
	async run(interaction) {
		interaction.deferReply();
        const username = interaction.options.getUser("user").username ?? "Unknown";
        interaction.editReply({
            content: `Name: ${username}`
        })
    }
} satisfies Command;
