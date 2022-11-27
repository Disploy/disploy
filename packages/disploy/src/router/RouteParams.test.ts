import { describe, expect, test } from '@jest/globals';
import { RouteParams } from './RouteParams';

describe('RouteParams', () => {
	test('Parse(test-:id, test-123) -> id = 123', () => {
		const template = 'test-:id';
		const data = 'test-123';
		const params = new RouteParams(null, template, data);

		expect(params.getParam('id')).toBe('123');
	});
});
