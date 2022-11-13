import type { ActionRow } from "./ActionRow";

export class Modal {
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

    toJSON(){
        return JSON.stringify(this);
    }

    constructor() {}
}