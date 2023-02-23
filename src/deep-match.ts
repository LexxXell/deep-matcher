import { MatchResult } from './@types/deep-matcher.types';

/**
 * @dev The function checks the incoming objects for a match,
 * and returns the difference in their key values.
 *
 * Since JSON does not support the UNDEFINED value type,
 * the record will display a $$undefined$$ string for values of that type.
 *
 * @param original object
 * @param modified object
 * @returns MatchResult[]
 */
export default function deepMatch(original: object, modified: object): MatchResult[] {
  const keys = [...new Set(Object.keys(original).concat(Object.keys(modified)))];
  return (keys as Array<keyof typeof original | keyof typeof modified>)
    .map((key): MatchResult => {
      if (typeof original[key] === 'object' || typeof modified[key] === 'object') {
        return {
          key,
          diff: deepMatch(original[key] || {}, modified[key] || {}),
        };
      } else if (original[key] !== modified[key]) {
        return {
          key,
          diff: [
            typeof original[key] === 'undefined' ? '$$undefined$$' : original[key],
            typeof modified[key] === 'undefined' ? '$$undefined$$' : modified[key],
          ],
        };
      }
    })
    .filter((el) => el !== undefined);
}
