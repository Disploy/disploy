import {ActionRowComponent} from "./ActionRowComponent";
import type {App} from "../client";

export class ModalActionRowComponent extends ActionRowComponent {
    public required?: boolean;
    public value?: string;
    public placeholder?: string;

    setRequired(required: boolean){
        this.required = required;
        return this;
    }

    setValue(value: string){
        this.value = value;
        return this;
    }

    setPlaceholder(placeholder: string){
        this.placeholder = placeholder;
        return this;
    }

    constructor(app: App) {
        super(app);
    }
}