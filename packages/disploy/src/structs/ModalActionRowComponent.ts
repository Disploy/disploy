import {ActionRowComponent} from "./ActionRowComponent";
import type {App} from "../client";
import {ComponentType, TextInputStyle} from "discord-api-types/v10";

export class ModalActionRowComponent extends ActionRowComponent {
    public style: TextInputStyle | undefined;
    public label: string | undefined;
    public minLength: number | null = null;
    public maxLength: number | null = null;
    public required: boolean | null = null;
    public value: string | null = null;
    public placeholder: string | null = null;

    setStyle(style: TextInputStyle){
        this.style = style;
    }

    setLabel(label: string){
        this.label = label;
    }

    setMinLength(length: number){
        this.minLength = length;
    }

    setMaxLength(length: number){
        this.maxLength = length;
    }

    setRequired(required: boolean){
        this.required = required;
    }

    setValue(value: string){
        this.value = value;
    }

    setPlaceholder(placeholder: string){
        this.placeholder = placeholder;
    }

    constructor(app: App) {
        super(app, ComponentType.TextInput);
    }
}