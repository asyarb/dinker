/**
 * Normalizes a string for search comparison by removing diacritical marks,
 * special characters, and converting to lowercase.
 *
 * @param str - The string to normalize
 * @returns The normalized string suitable for search operations
 *
 * @example
 * ```ts
 * normalizeString("ʻĀhuimanu Community Park")
 * // Returns: "ahuimanu community park"
 * ```
 */
export function normalizeString(str: string): string {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[ʻ]/g, "")
		.toLowerCase()
}
