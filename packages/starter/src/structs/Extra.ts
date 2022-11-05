import type { ExtraPayload } from './types';

export class Extra {
	public description!: string;
	public location!: string;
	public name!: string;

	constructor(data: ExtraPayload) {
		this.description = data.description;
		this.name = data.name;
		this.location = data.location;
	}
}
