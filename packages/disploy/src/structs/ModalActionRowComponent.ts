import { ActionRowComponent } from './ActionRowComponent';

export class ModalActionRowComponent extends ActionRowComponent {
	public required?: boolean;
	public value?: string;
	public placeholder?: string;

	public setRequired(required: boolean) {
		this.required = required;
		return this;
	}

	public setValue(value: string) {
		this.value = value;
		return this;
	}

	public setPlaceholder(placeholder: string) {
		this.placeholder = placeholder;
		return this;
	}

	public constructor(raw?: RawModalActionComponent) {
		super();
		this.required = raw?.required ?? undefined;
		this.value = raw?.value ?? undefined;
		this.placeholder = raw?.placeholder ?? undefined;
	}
}

class RawModalActionComponent {
	required?: boolean;
	value?: string;
	placeholder?: string;
}
