/**
 * Creates a slug from a string
 * @param string The string
 * @returns The string lowercased and separated by dashes
 */
export function slugify(string: string): string {
	return string
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+|-+$/, '');
}

/**
 * @param string - The string
 * @returns A capitalized string
 */
export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Converts a regular string to camel case
 * @param string - The string
 * @returns A camel cased string
 */
export function camelCase(string: string): string {
	return string.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');
}

/**
 * Returns a new string with all matches of a pattern replaced by a replacement
 * Not using the native replaceAll since it's not supported by all node versions
 * @param string The original string
 * @param search A String that is to be replaced by the replace parameter
 * @param replace The String that replaces the substring specified by the find parameter
 */
export function replaceAll(string: string, search: string, replace: string): string {
	return string.replace(new RegExp(search, 'gi'), replace);
}

/**
 * Generates a random hash
 * @returns A randomized hash
 */
export function generateRandomHash(): string {
	return (Math.random() + 1).toString(36).substring(7);
}
