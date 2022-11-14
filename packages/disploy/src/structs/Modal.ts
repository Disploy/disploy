import type { ActionRow } from "./ActionRow";

export class Modal {
    public customId?: string;
    public title?: string;
    public components: ActionRow[] = [];

    public setCustomId(id: string){
        this.customId = id;
        return this;
    }

    public setTitle(title: string){
        this.title = title;
        return this;
    }

    public setComponents(components: ActionRow[]){
        this.components = components;
        return this;
    }

    public addComponents(components: ActionRow[]){
        this.components.push(...components);
        return this;
    }

    public toJSON(){
        return JSON.stringify(this);
    }

    public constructor(raw?: RawModalBuilder) {
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