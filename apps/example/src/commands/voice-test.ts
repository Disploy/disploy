import { AudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice';
import { APIApplicationCommandOption, ApplicationCommandOptionType, MessageFlags } from 'discord-api-types/v10';
import type { ChatInputCommand, ChatInputInteraction } from 'disploy';
import path from 'node:path';

export default new (class VoiceTestCommand implements ChatInputCommand {
	public name = 'voice-test';
	public description = 'Voice test 123';
	public options: APIApplicationCommandOption[] = [
		{
			name: 'channel',
			description: 'The channel to join',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	];

	public async run(interaction: ChatInputInteraction) {
		if (!interaction.guild) {
			return void interaction.reply({
				content: 'This command can only be used in a guild',
				flags: MessageFlags.Ephemeral,
			});
		}

		interaction.deferReply();

		const channel = interaction.options.getString('channel');

		const connection = joinVoiceChannel({
			channelId: channel,
			guildId: interaction.guild.id,
			adapterCreator: interaction.app.ws.createVoiceAdapter(interaction.guild.id),
		});

		const player = new AudioPlayer();
		const song = createAudioResource(path.join(__dirname, '..', '..', 'music', 'audio.mp3'));

		player.play(song);
		connection.subscribe(player);

		return void interaction.editReply({
			content: `ok`,
		});
	}
})();
