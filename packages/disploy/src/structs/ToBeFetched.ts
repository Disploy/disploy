import type { App } from '../client/App';
import type { NonRuntimeClass, StructureConstructor } from '../types';
import type { Base } from './Base';

export class ToBeFetched<T extends Base> {
	public constructor(
		private app: App,
		private object: NonRuntimeClass<T>,
		/**
		 * The ID of the held object.
		 */
		public id: string,
		private _fetch: (id: string) => Promise<unknown>,
	) {}

	public async fetch(): Promise<T> {
		const raw = await this._fetch(this.id);
		const Structure = this.object as unknown as StructureConstructor<T>;

		return new Structure(this.app, raw);
	}
}
