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

/**
 * The simple linear regression is a predictive algorithm that provides a linear relationship between one input (x) and a predicted result (y).
 * @see [Original article](https://blog.oliverjumpertz.dev/simple-linear-regression-theory-math-and-implementation-in-javascript)
 * @param data The dataset
 * @param xKey The input X key
 * @param yKey The input Y key
 * @returns The prediction function
 */
export function linearRegression<T>(data: T[], xKey: keyof T, yKey: keyof T): (x: number) => number {
	// X
	const x = data.map(element => element[xKey]) as unknown as number[];
	const sumX = x.reduce((prev, curr) => prev + curr, 0);
	const avgX = sumX / x.length;
	const xDifferencesToAverage = x.map(value => avgX - value);
	const xDifferencesToAverageSquared = xDifferencesToAverage.map(value => value ** 2);
	const SSxx = xDifferencesToAverageSquared.reduce((prev, curr) => prev + curr, 0);
	// Y
	const y = data.map(element => element[yKey]) as unknown as number[];
	const sumY = y.reduce((prev, curr) => prev + curr, 0);
	const avgY = sumY / y.length;
	const yDifferencesToAverage = y.map(value => avgY - value);
	const xAndYDifferencesMultiplied = xDifferencesToAverage.map((curr, index) => curr * yDifferencesToAverage[index]);
	const SSxy = xAndYDifferencesMultiplied.reduce((prev, curr) => prev + curr, 0);
	// Slope and Intercept
	const slope = SSxy / SSxx;
	const intercept = avgY - slope * avgX;
	return x => intercept + slope * x;
}
