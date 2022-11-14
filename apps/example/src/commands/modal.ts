import { Command, Modal, ActionRow, TextInputComponent, ModalSubmitInteraction, ModalActionRowComponent } from 'disploy';
import { TextInputStyle } from "discord-api-types/v10";

export default {
    name: 'modal',
    description: 'show a cool modal',

    async run(interaction) {
        const modal = new Modal()
            .setCustomId("cool-modal")
            .setComponents([
                new ActionRow()
                    .setComponents([
                        new TextInputComponent()
                            .setCustomId("favNum")
                            .setLabel("What is your favorite number?")
                            .setStyle(TextInputStyle.Short)
                            .setMinLength(1)
                            .setRequired(true)
                            .setPlaceholder("10")
                    ])
            ]);
        interaction.showModal(modal);
    },

    async modalSubmit(interaction: ModalSubmitInteraction) {
        const favNumComp: ModalActionRowComponent = interaction.components[0]?.get("favNum") as TextInputComponent;
        const favNum: string = favNumComp?.getValue();
        interaction.reply({
            content: `Nice favorite number: ${favNum ?? "10"}.`
        });
    }
} satisfies Command;
