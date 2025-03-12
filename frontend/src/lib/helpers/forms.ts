/**
 * Transforms an array of objects into an array of options with specified value and label keys.
 *
 * @param {T[]} arr - The array of objects to transform.
 * @param {Value} value - The key used to extract the value for each option.
 * @param {Label} label - The key used to extract the label for each option.
 * @returns {{ value: T[Value]; label: T[Label] }[]} An array of objects with value and label properties.
 */
export function getOptions<
  T extends object,
  // Value extends keyof T,
  Value extends KeysMatching<T, PropertyKey>,
  // Label extends keyof T,
  Label extends KeysMatching<T, string>
>(
  arr: readonly T[],
  value: Value,
  label: Label,
  filter?: Parameters<ReadonlyArray<T>["filter"]>[0]
): { value: T[Value]; label: T[Label] }[] {
  let fArr = arr;
  if (filter) {
    fArr = arr.filter(filter);
  }
  const options = fArr.map((item) => ({
    value: item[value],
    label: item[label],
  }));
  return options;
}
