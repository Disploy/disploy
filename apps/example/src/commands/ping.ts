import { MessageFlags } from 'discord-api-types/v10';
import type { ChatInputCommand, ChatInputInteraction } from 'disploy';

export default new (class PingCommand implements ChatInputCommand {
	public name = 'ping';
	public description = 'Ping the bot';
	public options = [];

	public async run(interaction: ChatInputInteraction) {
		interaction.reply({ content: 'ok', flags: MessageFlags.Ephemeral });
	}
})();
