import {ActionRowComponent} from "./ActionRowComponent";
import type { ModalSubmitComponent as APIModalSubmitComponent } from "discord-api-types/v10";

export class ModalSubmitComponent extends ActionRowComponent {
    public value: string;

    constructor(raw: APIModalSubmitComponent){
        super();
        this.type = raw.type;
        this.customId = raw.custom_id;
        this.value = raw.value;
    }
}