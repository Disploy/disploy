import type { App } from "../client";
import {ActionRowComponent} from "./ActionRowComponent";
import type { ModalSubmitComponent as APIModalSubmitComponent } from "discord-api-types/v10";

export class ModalSubmitComponent extends ActionRowComponent {
    public value: string;

    constructor(app: App, raw: APIModalSubmitComponent){
        super(app);
        this.type = raw.type;
        this.customId = raw.custom_id;
        this.value = raw.value;
    }
}