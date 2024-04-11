/**
 * 针对正则表达式有特殊语义的字符进行转义
 * @link https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 *
 * @deprecated Use `_.escapeRegExp` instead
 */
export function escapeRegExp(input: string) {
  // $& means the whole matched string
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
