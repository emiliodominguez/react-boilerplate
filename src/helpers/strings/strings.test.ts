import * as helpers from '.';

describe('Strings helpers', () => {
	describe('slugify', () => {
		test('should return a slug like string', () => {
			// Given
			const sentence = 'test sentence';

			// When
			const result = helpers.slugify(sentence);

			// Then
			expect(result).toEqual('test-sentence');
		});
	});

	describe('capitalize', () => {
		test('should return a capitalized string', () => {
			// Given
			const sentence = 'test sentence';

			// When
			const result = helpers.capitalize(sentence);

			// Then
			expect(result).toEqual('Test sentence');
		});
	});

	describe('camelCase', () => {
		test('should return a camel cased string', () => {
			// Given
			const sentence = 'test sentence';

			// When
			const result = helpers.camelCase(sentence);

			// Then
			expect(result).toEqual('testSentence');
		});
	});

	describe('replaceAll', () => {
		test('should replace all the occurrences of a string within a sentence', () => {
			// Given
			const sentence = 'test sentence';

			// When
			const result = helpers.replaceAll(sentence, 'test', 'replaced');

			// Then
			expect(result).toEqual('replaced sentence');
		});

		test("should return the sentence as is if the replacement couldn't happen", () => {
			// Given
			const sentence = 'test sentence';

			// When
			const result = helpers.replaceAll(sentence, 'testing', 'replaced');

			// Then
			expect(result).toEqual(sentence);
		});
	});

	describe('generateRandomHash', () => {
		test('should generate a random hash', () => {
			// Given
			// When
			const result = helpers.generateRandomHash();

			// Then
			expect(typeof result).toEqual('string');
		});
	});
});
