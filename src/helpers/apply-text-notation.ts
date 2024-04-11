import { ETextNotation } from '@/configs/settings';
import { wrapWithMark } from './wrap-with-mark';

/**
 * 给 `文本字符串` 应用标记，返回 `新的文本字符串`
 */
export function applyTextNotation(
  text: string,
  notation?: ETextNotation | ETextNotation[],
): string {
  if (!notation) {
    return text;
  }

  if (Array.isArray(notation)) {
    if (!notation.length) {
      return text;
    }

    return notation.reduce((t, n) => applyTextNotation(t, n), text);
  } else {
    return wrapWithMark(text, notation);
  }
}
