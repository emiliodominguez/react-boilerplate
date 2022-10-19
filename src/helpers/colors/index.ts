import { clamp } from '../math';

/**
 * Converts a color component to hex
 * @param component The component
 * @returns The converted component
 */
function componentToHex(component: number): string {
	const hex = component.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Converts a RGB color to hexadecimal
 * @param r The R component
 * @param g The G component
 * @param b The B component
 * @returns The HEX color
 */
export function rgbToHex(r: number, g: number, b: number): string {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Converts an hexadecimal color to RGB
 * @param hex The color HEX
 * @returns The RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const shortHexRegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shortHexRegExp, (_, r, g, b) => r + r + g + g + b + b);
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	if (!result) throw Error('A valid HEX must be provided');

	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	};
}

/**
 * Gets the contrast color of a base color
 * @param color The original color HEX
 * @param darkColor An optional dark color
 * @param lightColor An optional light color
 */
export function getContrastColor(color: string, darkColor?: string, lightColor?: string): string {
	const { r, g, b } = hexToRgb(color);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000; // https://en.wikipedia.org/wiki/YIQ
	const contrastColor = yiq >= 128 ? darkColor ?? '#000000' : lightColor ?? '#ffffff';
	return contrastColor;
}

/**
 * Generates a color scale based on one color
 * @param colorHex The HEX color
 * @param steps The amount of steps
 * @returns The color scale
 */
export function generateColorScale(colorHex: string, steps = 10): string[] {
	const offset = 6;
	const scale: string[] = [];
	let { r, g, b } = hexToRgb(colorHex);

	for (let i = 0; i < steps; i++) {
		r -= offset;
		g -= offset;
		b -= offset;
		scale.push(rgbToHex(clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255)));
	}

	return scale;
}
