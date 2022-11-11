import { Base } from "./Base";
import type { App } from "../client";
import type { ComponentType } from "discord-api-types/v10";

export class ActionRowComponent extends Base {
    public customId?: string;
    public type?: ComponentType;

    setCustomId(id: string){
        this.customId = id;
        return this;
    }

    constructor(app: App){
        super(app);
    }
}