import type { App } from "../client";
import { Base } from "./Base";
import type { ActionRow } from "./ActionRow";

export class Modal extends Base {
    public customId?: string;
    public title?: string;
    public components: ActionRow[] = [];

    setCustomId(id: string){
        this.customId = id;
        return this;
    }

    setTitle(title: string){
        this.title = title;
        return this;
    }

    setComponents(components: Array<ActionRow>){
        this.components = components;
        return this;
    }

    addComponents(components: Array<ActionRow>){
        this.components.push(...components);
        return this;
    }

    constructor(app: App) {
        super(app);
    }
}