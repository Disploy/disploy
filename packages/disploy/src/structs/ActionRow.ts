import { Base } from "./Base";
import type { App } from "../client";
import { ComponentType } from "discord-api-types/v10";
import type { ActionRowComponent } from "./ActionRowComponent";

export class ActionRow extends Base {
    public type: ComponentType;
    private components: ActionRowComponent[] = [];

    public addComponents(components: ActionRowComponent[]){
        this.components.push(...components);
    }

    public setComponents(components: ActionRowComponent[]){
        this.components = components;
    }

    public constructor(app: App) {
        super(app);
        this.type = ComponentType.ActionRow;
        this.components = [];
    }
}