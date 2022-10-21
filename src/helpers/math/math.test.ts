import * as helpers from '.';

describe('Math helpers', () => {
	describe('clamp', () => {
		test('should clamp a value between a min/max range', () => {
			// Given
			const min = 0;
			const max = 100;

			// When
			const firstResult = helpers.clamp(150, min, max);
			const secondResult = helpers.clamp(-150, min, max);
			const thirdResult = helpers.clamp(50, min, max);

			// Then
			expect(firstResult).toEqual(max);
			expect(secondResult).toEqual(min);
			expect(thirdResult).toEqual(50);
		});
	});

	describe('normalize', () => {
		test('should normalize to a 0 - 1 range', () => {
			// Given
			const min = 0;
			const max = 100;

			// When
			const firstResult = helpers.normalize(50, min, max);

			// Then
			expect(firstResult).toEqual(0.5);
		});
	});
});
