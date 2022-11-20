import type { App } from '../client/App';
import type { NonRuntimeClass, StructureConstructor } from '../types';
import type { Base } from './Base';

export class ToBeFetched<T extends Base> {
	public constructor(private app: App, private object: NonRuntimeClass<T>, private _fetch: () => Promise<unknown>) {}

	public async fetch(): Promise<T> {
		const raw = await this._fetch();
		const Structure = this.object as unknown as StructureConstructor<T>;

		return new Structure(this.app, raw);
	}
}
