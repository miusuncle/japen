import { ETextNotation, textNotationCollection } from '@/configs/settings';

export function getMarkPair(notation: ETextNotation) {
  const { mark } = textNotationCollection.entities[notation];
  const [markBegin, markEnd] = Array.isArray(mark) ? mark : [mark, mark];
  return [markBegin, markEnd] as const;
}
