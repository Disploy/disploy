import { describe, expect, test } from 'vitest';
import { RouteParams } from './RouteParams';

describe('RouteParams', () => {
	test('Parse(test-:id, test-123) -> id = 123', () => {
		const template = 'test-:id';
		const data = 'test-123';
		const params = new RouteParams(null, template, data);

		expect(params.getParam('id')).toBe('123');
	});

	test('Parse(test-:id-:id2, test-123-456) -> id = 123, id2 = 456', () => {
		const template = 'test-:id-:id2';
		const data = 'test-123-456';
		const params = new RouteParams(null, template, data);

		expect(params.getParam('id')).toBe('123');
		expect(params.getParam('id2')).toBe('456');
	});
});
