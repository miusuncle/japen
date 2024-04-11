import { escapeRegExp } from 'lodash';
import React from 'react';
import { FontSizeOutlined } from '@ant-design/icons';
import { createEntityCollection } from '@/utils';

interface ITextNotationBase {
  group: 1 | 2 | 3 | 4;
  value: ETextNotation;
  mark: string | [string, string];
  markClass: string;
  icon: React.ReactNode;
  tooltips: {
    add: string;
    remove: string;
  };
}

type ITextNotation = Readonly<ITextNotationBase & { pattern: RegExp }>;

export enum ETextNotation {
  /** 标题 */
  TITLE = 'title',

  /** 文字加粗 */
  BOLD = 'bold',

  /** 文字颜色高亮 (L1) */
  HIGHLIGHT = 'highlight',

  /** 文字颜色高亮 (L2) */
  HIGHLIGHT_L2 = 'highlight-2',

  /** 文字减弱亮度 */
  DIMMED = 'dimmed',

  /** 文字背景荧光色 */
  FLUORESCENT = 'fluorescent',

  /** 文字填充背景 */
  FILL = 'fill',

  /** 描边 */
  STROKE = 'stroke',

  /** 文字下划线 (solid) */
  UNDERLINE_SOLID = 'underline-solid',

  /** 文字下划线 (dashed) */
  UNDERLINE_DASHED = 'underline-dashed',

  /** 文字下划线 (dotted) */
  UNDERLINE_DOTTED = 'underline-dotted',

  /** 文字下划线 (wavy) */
  UNDERLINE_WAVY = 'underline-wavy',

  /** 文字下划线 (fluorescent) */
  UNDERLINE_FLUORESCENT = 'underline-fluorescent',

  /** 文字删除线 */
  LINE_THROUGH = 'line-through',

  /** 字号 +2px */
  FONT_SIZE_INCR_2PX = 'font-size-incr-2px',

  /** 字号 +4px */
  FONT_SIZE_INCR_4PX = 'font-size-incr-4px',

  /** 字号 +6px */
  FONT_SIZE_INCR_6PX = 'font-size-incr-6px',

  /** 字号 -2px */
  FONT_SIZE_DECR_2PX = 'font-size-decr-2px',

  /** 字号 -4px */
  FONT_SIZE_DECR_4PX = 'font-size-decr-4px',

  /** 字号 -6px */
  FONT_SIZE_DECR_6PX = 'font-size-decr-6px',

  /** 汉字不标注假名 */
  NO_HURIGANA = 'no-hurigana',

  /** 用 `宋体 (简)` 字体展示 */
  ZH_SONG_SC = 'zh-song-sc',

  /** 用 `楷体 (简)` 字体展示 */
  ZH_KAITI_SC = 'zh-kaiti-sc',

  /** 用 `楷体 (今)` 字体展示 */
  ZH_KAITI_JIN = 'zh-kaiti-jin',

  /** 用 `隶书 (简)` 字体展示 */
  ZH_BAOLI_SC = 'zh-baoli-sc',

  /** 用 `黑体 (兰)` 字体展示 */
  ZH_HEITI_LAN = 'zh-heiti-lan',

  /** 用 `平方 (简)` 字体展示 */
  ZH_PINGFANG_SC = 'zh-pingfang-sc',

  /** 用 `宋体 (京华)` 字体展示 */
  ZH_SONG_KING_HWA = 'zh-song-king-hwa',

  /** 用 `游明朝体` 字体展示 */
  JA_YUMINCHO = 'ja-yumincho',

  /** 用 `游明朝体 +36ポ かな` 字体展示 */
  JA_YUMINCHO_36P_KANA = 'ja-yumincho-36p-kana',

  /** 用 `凸版文久黑体 (粗)` 字体展示 */
  JA_TOPPAN_BUNKYU_MIDASHI_GOTHIC = 'ja-toppan-bunkyu-midashi-gothic',

  /** 用 `凸版文久明朝 (粗)` 字体展示 */
  JA_TOPPAN_BUNKYU_MIDASHI_MINCHO = 'ja-toppan-bunkyu-midashi-mincho',
}

const baseTextNotations: ITextNotationBase[] = [
  // 第一组
  {
    group: 1,
    value: ETextNotation.TITLE,
    mark: '﹟',
    markClass: 'text-title',
    icon: <FontSizeOutlined style={{ fontSize: 16, color: 'var(--preview-highlight-color)' }} />,
    tooltips: {
      add: '标题化',
      remove: '去标题化',
    },
  },
  {
    group: 1,
    value: ETextNotation.BOLD,
    mark: '﹡',
    markClass: 'text-bold',
    icon: <span>{'B'}</span>,
    tooltips: {
      add: '文字加粗',
      remove: '取消文字加粗',
    },
  },
  {
    group: 1,
    value: ETextNotation.HIGHLIGHT,
    mark: '⁂',
    markClass: 'text-highlight',
    icon: <span style={{ color: 'var(--preview-highlight-color)' }}>{'H¹'}</span>,
    tooltips: {
      add: '文字高亮 (L1)',
      remove: '取消文字高亮',
    },
  },
  {
    group: 1,
    value: ETextNotation.HIGHLIGHT_L2,
    mark: '⍣',
    markClass: 'text-highlight-2',
    icon: (
      <span
        style={{
          color: 'var(--preview-highlight-color-2)',
        }}
      >
        {'H²'}
      </span>
    ),
    tooltips: {
      add: '文字高亮 (L2)',
      remove: '取消文字高亮',
    },
  },
  {
    group: 1,
    value: ETextNotation.DIMMED,
    mark: '⌄',
    markClass: 'text-dimmed',
    icon: <span style={{ opacity: 0.65 }}>{'D'}</span>,
    tooltips: {
      add: '文字半透明',
      remove: '取消文字半透明',
    },
  },
  {
    group: 1,
    value: ETextNotation.FLUORESCENT,
    mark: '‼',
    markClass: 'text-fluorescent',
    icon: (
      <span
        style={{
          padding: '0 5px',
          backgroundColor: 'var(--preview-fluorescent-color)',
        }}
      >
        {'Y'}
      </span>
    ),
    tooltips: {
      add: '添加荧光背景',
      remove: '移除荧光背景',
    },
  },
  {
    group: 1,
    value: ETextNotation.FILL,
    mark: '⁑',
    markClass: 'text-fill',
    icon: (
      <span
        style={{
          padding: '0 6px',
          color: 'var(--preview-highlight-invert-color)',
          backgroundColor: 'var(--preview-highlight-color)',
        }}
      >
        {'F'}
      </span>
    ),
    tooltips: {
      add: '添加实体背景',
      remove: '移除文字背景',
    },
  },
  {
    group: 1,
    value: ETextNotation.STROKE,
    mark: '⧠',
    markClass: 'text-stroke',
    icon: (
      <span
        style={{
          padding: '0 6px',
          outline: '1.5px solid var(--preview-text-stroke-color)',
        }}
      >
        {'S'}
      </span>
    ),
    tooltips: {
      add: '添加文字描边',
      remove: '移除文字描边',
    },
  },
  {
    group: 1,
    value: ETextNotation.UNDERLINE_SOLID,
    mark: '＿',
    markClass: 'text-underline text-underline-solid',
    icon: (
      <span
        style={{
          borderBlockEnd: '2px solid var(--preview-highlight-color)',
        }}
      >
        {'T'}
      </span>
    ),
    tooltips: {
      add: '添加下划线 (实线)',
      remove: '移除文字下划线 (实线)',
    },
  },
  {
    group: 1,
    value: ETextNotation.UNDERLINE_DASHED,
    mark: '﹍',
    markClass: 'text-underline text-underline-dashed',
    icon: (
      <span
        style={{
          borderBlockEnd: '2px dashed var(--preview-highlight-color-weak)',
        }}
      >
        {'T'}
      </span>
    ),
    tooltips: {
      add: '添加下划线 (虚线)',
      remove: '移除下划线 (虚线)',
    },
  },
  {
    group: 1,
    value: ETextNotation.UNDERLINE_DOTTED,
    mark: '﹎',
    markClass: 'text-underline text-underline-dotted',
    icon: (
      <span
        style={{
          borderBlockEnd: '2px dotted var(--preview-highlight-color-weak)',
        }}
      >
        {'T'}
      </span>
    ),
    tooltips: {
      add: '添加下划线 (点线)',
      remove: '移除下划线 (点线)',
    },
  },
  {
    group: 1,
    value: ETextNotation.UNDERLINE_WAVY,
    mark: '﹏',
    markClass: 'text-wavy',
    icon: (
      <span
        style={{
          textDecoration: 'underline',
          textDecorationStyle: 'wavy',
          textUnderlineOffset: 3,
          textDecorationColor: 'var(--preview-text-wavy-color)',
        }}
      >
        {'T'}
      </span>
    ),
    tooltips: {
      add: '添加下划线 (波浪线)',
      remove: '移除下划线 (波浪线)',
    },
  },
  {
    group: 1,
    value: ETextNotation.UNDERLINE_FLUORESCENT,
    mark: '₌₌',
    markClass: 'text-fluorescent-underline',
    icon: (
      <span
        className="fluorescent-underline"
        style={{
          textDecorationColor: 'var(--preview-fluorescent-underline-color)',
        }}
      >
        {'T'}
      </span>
    ),
    tooltips: {
      add: '添加下划线 (荧光线)',
      remove: '移除下划线 (荧光线)',
    },
  },
  {
    group: 1,
    value: ETextNotation.LINE_THROUGH,
    mark: '⁻⁻',
    markClass: 'text-line-through',
    icon: (
      <span
        style={{
          textDecoration: 'line-through',
          textDecorationColor: 'var(--preview-text-delete-color)',
        }}
      >
        {'T'}
      </span>
    ),
    tooltips: {
      add: '添加删除线',
      remove: '移除删除线',
    },
  },
  {
    group: 1,
    value: ETextNotation.NO_HURIGANA,
    mark: 'ᚦ',
    markClass: 'text-no-hurigana',
    icon: (
      <span
        style={{
          textDecoration: 'line-through',
          textDecorationColor: 'var(--preview-text-delete-color)',
        }}
      >
        {'か'}
      </span>
    ),
    tooltips: {
      add: '添加不标注假名记号',
      remove: '移除不标注假名记号',
    },
  },

  // 第二组
  {
    group: 2,
    value: ETextNotation.ZH_SONG_SC,
    mark: ['⁽㊥❶', '㊥❶⁾'],
    markClass: 'text-song-sc',
    icon: (
      <span>
        <span style={{ fontFamily: 'Songti SC' }}>{'宋'}</span>
        <sup style={{ fontSize: 9 }}>{'简'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❶'}</sub>
      </span>
    ),
    tooltips: {
      add: '用宋体 (简) 展示',
      remove: '不用宋体 (简) 展示',
    },
  },
  {
    group: 2,
    value: ETextNotation.ZH_KAITI_SC,
    mark: ['⁽㊥❷', '㊥❷⁾'],
    markClass: 'text-kaiti-sc',
    icon: (
      <span>
        <span style={{ fontFamily: 'Kaiti SC' }}>{'楷'}</span>
        <sup style={{ fontSize: 9 }}>{'简'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❷'}</sub>
      </span>
    ),
    tooltips: {
      add: '用楷体 (简) 展示',
      remove: '不用楷体 (简) 展示',
    },
  },
  {
    group: 2,
    value: ETextNotation.ZH_KAITI_JIN,
    mark: ['⁽㊥❸', '㊥❸⁾'],
    markClass: 'text-kaiti-jin',
    icon: (
      <span>
        <span style={{ fontFamily: 'DeDaoJinKai' }}>{'楷'}</span>
        <sup style={{ fontSize: 9 }}>{'今'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❸'}</sub>
      </span>
    ),
    tooltips: {
      add: '用楷体 (今) 展示',
      remove: '不用楷体 (今) 展示',
    },
  },
  {
    group: 2,
    value: ETextNotation.ZH_BAOLI_SC,
    mark: ['⁽㊥❹', '㊥❹⁾'],
    markClass: 'text-baoli-sc',
    icon: (
      <span>
        <span style={{ fontFamily: 'Baoli SC' }}>{'隶'}</span>
        <sup style={{ fontSize: 9 }}>{'简'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❹'}</sub>
      </span>
    ),
    tooltips: {
      add: '用隶书 (简) 展示',
      remove: '不用隶书 (简) 展示',
    },
  },
  {
    group: 2,
    value: ETextNotation.ZH_HEITI_LAN,
    mark: ['⁽㊥❺', '㊥❺⁾'],
    markClass: 'text-heiti-lan',
    icon: (
      <span>
        <span style={{ fontFamily: 'Lantinghei SC' }}>{'黑'}</span>
        <sup style={{ fontSize: 9 }}>{'兰'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❺'}</sub>
      </span>
    ),
    tooltips: {
      add: '用黑体 (兰) 展示',
      remove: '不用黑体 (兰) 展示',
    },
  },
  {
    group: 2,
    value: ETextNotation.ZH_PINGFANG_SC,
    mark: ['⁽㊥❻', '㊥❻⁾'],
    markClass: 'text-pingfang-sc',
    icon: (
      <span>
        <span style={{ fontFamily: 'PingFang SC' }}>{'平'}</span>
        <sup style={{ fontSize: 9 }}>{'简'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❻'}</sub>
      </span>
    ),
    tooltips: {
      add: '用平方 (简) 展示',
      remove: '不用平方 (简) 展示',
    },
  },
  {
    group: 2,
    value: ETextNotation.ZH_SONG_KING_HWA,
    mark: ['⁽㊥❼', '㊥❼⁾'],
    markClass: 'text-song-king-hwa',
    icon: (
      <span>
        <span style={{ fontFamily: 'KingHwa_OldSong' }}>{'宋'}</span>
        <sup style={{ fontSize: 9 }}>{'京'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'❼'}</sub>
      </span>
    ),
    tooltips: {
      add: '用宋体 (京华老宋) 展示',
      remove: '不用宋体 (京华老宋) 展示',
    },
  },

  // 第三组
  {
    group: 3,
    value: ETextNotation.JA_YUMINCHO,
    mark: ['⁽㊐①', '㊐①⁾'],
    markClass: 'text-yumincho',
    icon: (
      <span>
        <span style={{ fontFamily: 'YuMincho' }}>{'游'}</span>
        <sup style={{ fontSize: 9 }}>{'明'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'①'}</sub>
      </span>
    ),
    tooltips: {
      add: '用游明朝体展示',
      remove: '不用游明朝体展示',
    },
  },
  {
    group: 3,
    value: ETextNotation.JA_YUMINCHO_36P_KANA,
    mark: ['⁽㊐②', '㊐②⁾'],
    markClass: 'text-yumincho-36p-kana',
    icon: (
      <span>
        <span style={{ fontFamily: '"YuMincho +36p Kana"' }}>{'游'}</span>
        <sup style={{ fontSize: 9 }}>{'明'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'②'}</sub>
      </span>
    ),
    tooltips: {
      add: '用游明朝体 (+36p Kana) 展示',
      remove: '不用游明朝体 (+36p Kana) 展示',
    },
  },
  {
    group: 3,
    value: ETextNotation.JA_TOPPAN_BUNKYU_MIDASHI_GOTHIC,
    mark: ['⁽㊐③', '㊐③⁾'],
    markClass: 'text-toppan-bunkyu-midashi-gothic',
    icon: (
      <span>
        <span style={{ fontFamily: '"Toppan Bunkyu Midashi Gothic"' }}>{'凸'}</span>
        <sup style={{ fontSize: 9 }}>{'黑'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'③'}</sub>
      </span>
    ),
    tooltips: {
      add: '用凸版文久黑体 (粗) 展示',
      remove: '不用凸版文久黑体 (粗) 展示',
    },
  },
  {
    group: 3,
    value: ETextNotation.JA_TOPPAN_BUNKYU_MIDASHI_MINCHO,
    mark: ['⁽㊐④', '㊐④⁾'],
    markClass: 'text-toppan-bunkyu-midashi-mincho',
    icon: (
      <span>
        <span style={{ fontFamily: '"Toppan Bunkyu Midashi Mincho"' }}>{'凸'}</span>
        <sup style={{ fontSize: 9 }}>{'明'}</sup>
        <sub style={{ fontSize: 9, position: 'relative', left: -9 }}>{'④'}</sub>
      </span>
    ),
    tooltips: {
      add: '用凸版文久明朝体 (粗) 展示',
      remove: '不用凸版文久明朝体 (粗) 展示',
    },
  },

  // 第四组
  {
    group: 4,
    value: ETextNotation.FONT_SIZE_INCR_2PX,
    mark: '⧍⁺²',
    markClass: 'text-size-incr-2px',
    icon: (
      <span style={{ position: 'relative', display: 'block' }}>
        <FontSizeOutlined style={{ fontSize: 16 }} />
        <span style={{ position: 'absolute', top: 4, right: -4, fontSize: 10 }}>{'⁺²'}</span>
      </span>
    ),
    tooltips: {
      add: '字号增大 2px',
      remove: '取消字号增大 2px',
    },
  },
  {
    group: 4,
    value: ETextNotation.FONT_SIZE_INCR_4PX,
    mark: '⧍⁺⁴',
    markClass: 'text-size-incr-4px',
    icon: (
      <span style={{ position: 'relative', display: 'block' }}>
        <FontSizeOutlined style={{ fontSize: 16 }} />
        <span style={{ position: 'absolute', top: 4, right: -4, fontSize: 10 }}>{'⁺⁴'}</span>
      </span>
    ),
    tooltips: {
      add: '字号增大 4px',
      remove: '取消字号增大 4px',
    },
  },
  {
    group: 4,
    value: ETextNotation.FONT_SIZE_INCR_6PX,
    mark: '⧍⁺⁶',
    markClass: 'text-size-incr-6px',
    icon: (
      <span style={{ position: 'relative', display: 'block' }}>
        <FontSizeOutlined style={{ fontSize: 16 }} />
        <span style={{ position: 'absolute', top: 4, right: -4, fontSize: 10 }}>{'⁺⁶'}</span>
      </span>
    ),
    tooltips: {
      add: '字号增大 6px',
      remove: '取消字号增大 6px',
    },
  },
  {
    group: 4,
    value: ETextNotation.FONT_SIZE_DECR_2PX,
    mark: '⧍⁻²',
    markClass: 'text-size-decr-2px',
    icon: (
      <span style={{ position: 'relative', display: 'block' }}>
        <FontSizeOutlined style={{ fontSize: 16 }} />
        <span style={{ position: 'absolute', top: 4, right: -4, fontSize: 10 }}>{'⁻²'}</span>
      </span>
    ),
    tooltips: {
      add: '字号减小 2px',
      remove: '取消字号减小 2px',
    },
  },
  {
    group: 4,
    value: ETextNotation.FONT_SIZE_DECR_4PX,
    mark: '⧍⁻⁴',
    markClass: 'text-size-decr-4px',
    icon: (
      <span style={{ position: 'relative', display: 'block' }}>
        <FontSizeOutlined style={{ fontSize: 16 }} />
        <span style={{ position: 'absolute', top: 4, right: -4, fontSize: 10 }}>{'⁻⁴'}</span>
      </span>
    ),
    tooltips: {
      add: '字号减小 4px',
      remove: '取消字号减小 4px',
    },
  },
  {
    group: 4,
    value: ETextNotation.FONT_SIZE_DECR_6PX,
    mark: '⧍⁻⁶',
    markClass: 'text-size-decr-6px',
    icon: (
      <span style={{ position: 'relative', display: 'block' }}>
        <FontSizeOutlined style={{ fontSize: 16 }} />
        <span style={{ position: 'absolute', top: 4, right: -4, fontSize: 10 }}>{'⁻⁶'}</span>
      </span>
    ),
    tooltips: {
      add: '字号减小 6px',
      remove: '取消字号减小 6px',
    },
  },
];

export const textNotations: ITextNotation[] = baseTextNotations.map<ITextNotation>(notation => {
  const { mark, ...rest } = notation;
  let { markClass } = notation;

  if (notation.group === 2) {
    markClass = `text-zh-font ${markClass}`;
  } else if (notation.group === 3) {
    markClass = `text-ja-font ${markClass}`;
  }

  return {
    ...rest,
    mark,
    markClass,
    get pattern() {
      const [markBegin, markEnd] = Array.isArray(mark) ? mark : [mark, mark];
      return new RegExp(`${escapeRegExp(markBegin)}([\\s\\S]+?)${escapeRegExp(markEnd)}`, 'g');
    },
  };
});

export const textNotationCollection = createEntityCollection(textNotations, x => x.value);
