import { textNotations } from '@/configs/settings';

/**
 * 解析模板字符串的标记，替换成 DOM 元素
 */
export function resolveTextNotation(text: string) {
  return textNotations.reduce((resolvedText, notation) => {
    return resolvedText.replace(
      notation.pattern,
      `<span class="${notation.markClass}" data-notation="${notation.value}">$1</span>`,
    );
  }, text);
}
