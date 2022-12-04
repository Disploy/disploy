import type { EventHandler } from '../types/EventHandler';

const MessagePing: EventHandler<'messageCreate'> = {
	event: 'messageCreate',
	handle: async (message) => {
		if (message.content === '!ping') {
			const msg = await message.reply({ content: 'ok?' });

			msg.edit({ content: `ok @ ${msg.timestamp - message.timestamp}ms` });
		}
	},
};

export default MessagePing;
