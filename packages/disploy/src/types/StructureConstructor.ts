import type { App } from '../client';
import type { Base } from '../structs/Base';

export type StructureConstructor<T extends Base> = new (app: App, raw: unknown) => T;
