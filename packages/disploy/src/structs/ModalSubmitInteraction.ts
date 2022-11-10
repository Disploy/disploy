import { BaseInteraction } from "./BaseInteraction";
import type { APIModalSubmitInteraction } from "discord-api-types/v10";
import type { App } from "../client";
import type { ActionRow } from "./ActionRow";

export class ModalSubmitInteraction extends BaseInteraction {
    public customId: string;
    public components: Array<ActionRow>
    constructor(app: App, raw: APIModalSubmitInteraction){
        super(app, raw);
        this.customId = raw.custom_id;
        this.components = raw.components;
    }
}