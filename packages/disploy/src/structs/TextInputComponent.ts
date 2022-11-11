import {ModalActionRowComponent} from "./ModalActionRowComponent";
import type {App} from "../client";
import {ComponentType, TextInputStyle} from "discord-api-types/v10";

export class TextInputComponent extends ModalActionRowComponent {
    public style?: TextInputStyle;
    public label?: string;
    public minLength: number | null = null;
    public maxLength: number | null = null;

    setStyle(style: TextInputStyle){
        this.style = style;
        return this;
    }

    setLabel(label: string){
        this.label = label;
        return this;
    }

    setMinLength(length: number){
        this.minLength = length;
        return this;
    }

    setMaxLength(length: number){
        this.maxLength = length;
        return this;
    }

    constructor(app: App) {
        super(app);
        this.type = ComponentType.TextInput;
    }
}