import type { App } from "../client";
import { Base } from "./Base";
import type { ActionRow } from "./ActionRow";

export class Modal extends Base {
    public customId: string | undefined;
    public title: string | undefined;
    public components: Array<ActionRow> = [];

    setCustomId(id: string){
        this.customId = id;
    }

    setTitle(title: string){
        this.title = title;
    }

    setComponents(components: Array<ActionRow>){
        this.components = components;
    }

    addComponents(components: Array<ActionRow>){
        this.components.push(...components);
    }

    constructor(app: App) {
        super(app);
    }
}