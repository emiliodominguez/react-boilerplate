/**
 * Clamps a number between min and max values
 * @param value The number
 * @param min The min value
 * @param max The max value
 * @returns The result
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}

/**
 * Normalizes a value
 * @param value The number
 * @param min The min value
 * @param max The max value
 * @returns The result
 */
export function normalize(value: number, min: number, max: number): number {
	return (value - min) / (max - min);
}
