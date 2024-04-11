import { resolveTextNotation } from './resolve-text-notation';
import { flattenNestedSpans } from './flatten-nested-spans';

export function textToHtml(text: string) {
  return flattenNestedSpans(resolveTextNotation(text));
}
