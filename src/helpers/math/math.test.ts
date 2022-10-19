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

	describe('linearRegression', () => {
		test('should predict a value based on the provided set of data', () => {
			// Given
			const expenses = [
				{ month: 1, expense: 1000 },
				{ month: 2, expense: 2000 },
				{ month: 3, expense: 3000 }
			];

			// When
			const predict = helpers.linearRegression(expenses, 'month', 'expense');
			const firstPrediction = predict(4);
			const secondPrediction = predict(5);
			const thirdPrediction = predict(8);

			// Then
			expect(firstPrediction).toEqual(4000);
			expect(secondPrediction).toEqual(5000);
			expect(thirdPrediction).toEqual(8000);
		});
	});
});
