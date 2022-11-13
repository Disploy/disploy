import type { ComponentType } from "discord-api-types/v10";

export class ActionRowComponent {
    public customId?: string;
    public type?: ComponentType;

    setCustomId(id: string){
        this.customId = id;
        return this;
    }

    constructor(){}
}