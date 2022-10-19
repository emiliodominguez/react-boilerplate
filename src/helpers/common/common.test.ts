import * as helpers from '.';

describe('Common helpers', () => {
	describe('getObjectByKeys', () => {
		test('should get an object property from the provided key(s)', () => {
			// Given
			const testObject = {
				firstName: 'Lorem',
				lastName: 'Ipsum',
				dimensions: { height: 200, weight: 130 }
			};

			// When
			const firstName = helpers.getFromObjectByKeys<typeof testObject, string>(testObject, 'firstName');
			const lastName = helpers.getFromObjectByKeys<typeof testObject, string>(testObject, 'lastName');
			const height = helpers.getFromObjectByKeys<typeof testObject, string>(testObject, 'dimensions.height');
			const weight = helpers.getFromObjectByKeys<typeof testObject, string>(testObject, 'dimensions.weight');

			// Then
			expect(firstName).toEqual(testObject.firstName);
			expect(lastName).toEqual(testObject.lastName);
			expect(height).toEqual(testObject.dimensions.height);
			expect(weight).toEqual(testObject.dimensions.weight);
		});
	});
});
