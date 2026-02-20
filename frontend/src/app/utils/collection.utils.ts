import { KeyValueTuple, KeyValue } from '@@app/models/key-value';

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 */
function isNullish(value: any): boolean {
  return value == null;
}

function isNotNullish(value: any): boolean {
  return !isNullish(value);
}

/**
 * Convert object entries like [key, value] to KeyValue array.
 *
 * @param {Object} entries Object entries like [key, value]. Usually you can get it using Object.entries(obj) method.
 * @returns {Array<KeyValue>} Returns array of KeyValue.
 * @example
 *
 * const obj = { a: 1, b: null, c: '' };
 * getKeyValues(Object.entries(obj)) // [{ key: 'a', value: 1 }, { key: 'b', value: null }, { key: 'c', value: '' }]
 */
function getKeyValues<T>(entries: KeyValueTuple<T>[]): KeyValue<T>[] {
  return entries.map(([key, value]: KeyValueTuple<T>) => ({ key, value }));
}

/**
 * Convert object entries [key, value] to KeyValue array that contains only entries with not nullish value.
 *
 * @param {Object} object The object to iterate.
 * @returns {Array<KeyValue>} Returns collection of entries with not nullish values.
 * @example
 *
 * const obj = { a: 1, b: null, c: '' };
 * getEntriesWithNotNullishValues(obj) // [{ key: 'a', value: 1 }, { key: 'c', value: '' }]
 */
export function getEntriesWithNotNullishValues<T>(object: object): KeyValue<T>[] {
  const entries: KeyValueTuple<T>[] = Object.entries(object || {}).filter(([, value]: KeyValueTuple<T>) =>
    isNotNullish(value)
  );
  return getKeyValues(entries);
}
