import { dateFormat } from '@/utils';
import { ETextNotation } from '@/configs/settings';
import { stringifyTextManifest } from './stringify-text-manifest';

export const v1 = () => {
  return stringifyTextManifest({
    notation: ETextNotation.NO_HURIGANA,
    text: [
      {
        text: '日書',
        notation: [
          ETextNotation.HIGHLIGHT,
          ETextNotation.UNDERLINE_FLUORESCENT,
          ETextNotation.BOLD,
          ETextNotation.ZH_HEITI_LAN,
        ],
      },
      ' ',
      {
        text: dateFormat(new Date(), 'yyyy.mm.dd'),
        notation: ETextNotation.ZH_KAITI_JIN,
      },
    ],
  });
};

export const v2 = () => {
  return stringifyTextManifest({
    notation: [ETextNotation.UNDERLINE_SOLID, ETextNotation.NO_HURIGANA],
    text: [
      {
        notation: ETextNotation.FILL,
        text: ' ',
      },
      ' ',
      {
        notation: [ETextNotation.HIGHLIGHT, ETextNotation.BOLD, ETextNotation.ZH_HEITI_LAN],
        text: '日書',
      },
      ' ',
      {
        notation: ETextNotation.ZH_SONG_KING_HWA,
        text: dateFormat(new Date(), 'yy.mm.dd'),
      },
    ],
  });
};
