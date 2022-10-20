import * as helpers from '.';

describe('Colors helpers', () => {
	describe('hexToRgb', () => {
		test('should return an RGB color both for 6 or 3 digit hex input', () => {
			// Given
			const redHex = '#ff0000';
			const whiteHex = '#fff';

			// When
			const redRgb = helpers.hexToRgb(redHex);
			const whiteRgb = helpers.hexToRgb(whiteHex);

			// Then
			expect(redRgb).toEqual({ r: 255, g: 0, b: 0 });
			expect(whiteRgb).toEqual({ r: 255, g: 255, b: 255 });
		});

		test('should throw an error if result is invalid', () => {
			// Given
			const invalidHex = '#fff0000';

			// When
			// eslint-disable-next-line func-style
			const helperCall = () => helpers.hexToRgb(invalidHex);

			// Then
			expect(helperCall).toThrow();
		});
	});

	describe('rgbToHex', () => {
		test('should return a HEX color from RGB values', () => {
			// Given
			const redRgb = { r: 255, g: 0, b: 0 };
			const whiteRgb = { r: 255, g: 255, b: 255 };

			// When
			const redHex = helpers.rgbToHex(redRgb.r, redRgb.b, redRgb.g);
			const whiteHex = helpers.rgbToHex(whiteRgb.r, whiteRgb.b, whiteRgb.g);

			// Then
			expect(redHex).toEqual('#ff0000');
			expect(whiteHex).toEqual('#ffffff');
		});
	});

	describe('getContrastColor', () => {
		test('should return the default light color if input color is dark and no dark contrast color override is configured', () => {
			// Given
			const lightColor = '#fff'; // White

			// When
			const result = helpers.getContrastColor(lightColor);

			// Then
			expect(result).toEqual('#000000');
		});

		test('should return the default dark color if input color is light and no light contrast color override is configured', () => {
			// Given
			const darkColor = '#000'; // Black

			// When
			const result = helpers.getContrastColor(darkColor);

			// Then
			expect(result).toEqual('#ffffff');
		});

		test('should return a the corresponding contrast custom color', () => {
			// Given
			const lightColor = '#fff'; // White
			const darkColor = '#000'; // Black
			const lightColorContrast = '#222';
			const darkColorContrast = '#ccc';

			// When
			const lightColorResult = helpers.getContrastColor(lightColor, darkColorContrast, lightColorContrast);
			const darkColorResult = helpers.getContrastColor(darkColor, darkColorContrast, lightColorContrast);

			// Then
			expect(lightColorResult).toEqual(darkColorContrast);
			expect(darkColorResult).toEqual(lightColorContrast);
		});
	});

	describe('generateColorScale', () => {
		test('should generate a color scale from a single HEX color', () => {
			// Given
			const baseColor = '#ff0000';

			// When
			const scale = helpers.generateColorScale(baseColor);

			// Then
			expect(scale).toEqual(['#f90000', '#f30000', '#ed0000', '#e70000', '#e10000', '#db0000', '#d50000', '#cf0000', '#c90000', '#c30000']);
		});
	});
});
