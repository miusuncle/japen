import { ETextNotation } from '@/configs/settings';
import { getMarkPair } from './mark-pair';

export function wrapWithMark(text: string, notation: ETextNotation) {
  const [markBegin, markEnd] = getMarkPair(notation);
  return [markBegin, text, markEnd].join('');
}
