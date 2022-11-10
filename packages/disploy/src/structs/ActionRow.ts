import { Base } from "./Base";
import type { App } from "../client";
import { ComponentType } from "discord-api-types/v10";
import type { ActionRowComponent } from "./ActionRowComponent";

export class ActionRow extends Base {
    private type: ComponentType;
    private components: Array<ActionRowComponent> = [];

    public addComponents(components: Array<ActionRowComponent>){
        this.components.push(...components);
    }

    public setComponents(components: Array<ActionRowComponent>){
        this.components = components;
    }

    public constructor(app: App) {
        super(app);
        this.type = ComponentType.ActionRow;
        this.components = [];
    }
}