import type { ChatInputCommand, ChatInputInteraction } from 'disploy';

class TestClass implements ChatInputCommand {
	public name = 'class';
	public description = 'this command is a class!';

	private privateMethod() {
		return 'yo classes are sick';
	}

	public async run(interaction: ChatInputInteraction) {
		const message = this.privateMethod();

		return void interaction.reply({
			content: message,
		});
	}
}
export default new TestClass();
