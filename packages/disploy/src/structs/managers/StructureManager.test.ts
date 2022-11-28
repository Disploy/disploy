import { describe, expect, test } from '@jest/globals';
import { Base } from '../Base';
import { StructureManager } from './StructureManager';

interface ExampleData {
	id: string;
	name: string;
}

async function fetchExampleData(id: string): Promise<ExampleData> {
	return {
		id,
		name: `Example ${id}`,
	};
}

class ExampleClass extends Base {
	public id: string;
	public name: string;

	public constructor(_: null, raw: ExampleData) {
		super(null!, raw);
		this.id = raw.id;
		this.name = raw.name;
	}
}

const ExampleStructureManager = new StructureManager<ExampleClass>(null!, ExampleClass, (id) => fetchExampleData(id));

describe('StructureManager', () => {
	test('Example fetch', async () => {
		const tristan = await ExampleStructureManager.fetch('tristan');

		expect(tristan).toBeInstanceOf(ExampleClass);
		expect(tristan.id).toBe('tristan');
		expect(tristan.name).toBe('Example tristan');
	});
});
