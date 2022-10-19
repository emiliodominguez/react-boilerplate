import { NestedKeyOf } from '../type-utilities';

/**
 * Gets a nested (or not) value by its key
 * @param target The original object
 * @param key The key(s)
 */
export function getFromObjectByKeys<TTarget extends Object, TResult>(target: TTarget, key: NestedKeyOf<TTarget>): TResult {
	// @ts-ignore
	return key.split('.').reduce((acc, key) => (acc as any)[key], target) as unknown as TResult;
}
