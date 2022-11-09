import type { App } from '../../client';
import type { NonRuntimeClass, StructureConstructor } from '../../types';
import { Base } from '../Base';

export class StructureManager<T extends Base> extends Base {
	public constructor(app: App, private object: NonRuntimeClass<T>, private _fetch: (id: string) => Promise<unknown>) {
		super(app);
	}

	public async fetch(id: string): Promise<T> {
		const raw = await this._fetch(id);
		const Structure = this.object as unknown as StructureConstructor<T>;

		return new Structure(this.app, raw);
	}
}
