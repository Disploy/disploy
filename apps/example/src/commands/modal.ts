import type {Command} from 'disploy';
import {ActionRow, Modal, ModalSubmitInteraction, TextInputComponent} from "disploy/src";
import {TextInputStyle} from "discord-api-types/v10";

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
        const favNum = interaction.components[0].get("favNum").getValue();
        interaction.reply({
            content: `Nice favorite number: ${favNum}.`,
            ephemeral: true
        });
    }
} satisfies Command;
