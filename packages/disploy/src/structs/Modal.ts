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

    setComponents(components: ActionRow[]){
        this.components = components;
        return this;
    }

    addComponents(components: ActionRow[]){
        this.components.push(...components);
        return this;
    }

    toJSON(){
        return JSON.stringify(this);
    }

    constructor(raw?: RawModalBuilder) {
        this.title = raw?.title ?? undefined;
        this.customId = raw?.customId ?? undefined;
        this.components = raw?.components ?? [];
    }
}

class RawModalBuilder {
    title?: string;
    customId?: string;
    components?: ActionRow[];
}