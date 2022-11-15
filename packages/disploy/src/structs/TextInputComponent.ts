import { ModalActionRowComponent } from './ModalActionRowComponent';
import { ComponentType, TextInputStyle } from 'discord-api-types/v10';

export class TextInputComponent extends ModalActionRowComponent {
	public style?: TextInputStyle;
	public label?: string;
	public minLength?: number;
	public maxLength?: number;

	public setStyle(style: TextInputStyle) {
		this.style = style;
		return this;
	}

	public setLabel(label: string) {
		this.label = label;
		return this;
	}

	public setMinLength(length: number) {
		this.minLength = length;
		return this;
	}

	public setMaxLength(length: number) {
		this.maxLength = length;
		return this;
	}

	public constructor(raw?: RawTextInputComponent) {
		super();
		this.type = ComponentType.TextInput;
		this.style = raw?.style ?? undefined;
		this.label = raw?.label ?? undefined;
		this.minLength = raw?.minLength ?? undefined;
		this.maxLength = raw?.maxLength ?? undefined;
	}
}

class RawTextInputComponent {
	public style?: TextInputStyle;
	public label?: string;
	public minLength?: number;
	public maxLength?: number;
}
