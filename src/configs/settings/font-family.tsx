import React from 'react';
import { Tooltip } from 'antd';
import { createEntityCollection } from '@/utils';

/**
 * 兜底字体
 * @link https://stackoverflow.com/questions/14563064/japanese-standard-web-fonts/14573813#14573813
 * @link https://www.csstux.com/font-family.html
 */
export const DEFAULT_FONT_FAMILY = `'ヒラギノ角ゴ ProN', 'Hiragino Kaku Gothic ProN', '游ゴシック', '游ゴシック体', YuGothic, 'Yu Gothic', 'メイリオ', Meiryo, 'ＭＳ ゴシック', 'MS Gothic', HiraKakuProN-W3, 'TakaoExゴシック', TakaoExGothic, 'MotoyaLCedar', 'Droid Sans Japanese', sans-serif`;

export enum EFontFamily {
  /** 游明朝体 */
  YUMINCHO = 'yumincho',

  /** 游明朝体 +36ポ かな */
  YUMINCHO_36P_KANA = 'yumincho-36p-kana',

  /** ヒラギノ 明朝 ProN */
  HIRAGINO_MINCHO_PRON = 'hiragino-mincho-pron',

  /** 游教科書体 */
  YUKYOKASHO = 'yukyokasho',

  /** 游教科書体横用 */
  YUKYOKASHO_YOKO = 'yukyokasho-yoko',

  /** KLEE (手写体) */
  KLEE = 'klee',

  /** 傳統黑體 */
  HIRAGINO_SANS = 'hiragino-sans',

  /** 傳統黑體 (GB) */
  HIRAGINO_SANS_GB = 'hiragino-sans-gb',

  /** 凸版文久黑体 */
  TOPPAN_BUNKYU_GOTHIC = 'toppan-bunkyu-gothic',

  /** 凸版文久黑体 (粗) */
  TOPPAN_BUNKYU_MIDASHI_GOTHIC = 'toppan-bunkyu-midashi-gothic',

  /** 凸版文久明朝体 */
  TOPPAN_BUNKYU_MINCHO = 'toppan-bunkyu-mincho',

  /** 凸版文久明朝体 (粗) */
  TOPPAN_BUNKYU_MIDASHI_MINCHO = 'toppan-bunkyu-midashi-mincho',

  /** ヒラギノ 丸ゴ ProN */
  HIRAGINO_MARU_GOTHIC_PRON = 'hiragino-maru-gothic-pron',

  /** 筑紫 A 丸 */
  TSUKUSHI_A_ROUND_GOTHIC = 'tsukushi-a-round-gothic',

  /** 筑紫 B 丸 */
  TSUKUSHI_B_ROUND_GOTHIC = 'tsukushi-b-round-gothic',

  /** 森泽 BIZ UD Gothic */
  BIZ_UD_GOTHIC = 'biz-ud-gothic',

  /** 森泽 BIZ UD Mincho */
  BIZ_UD_MINCHO = 'biz-ud-mincho',

  /** 大阪 */
  OSAKA = 'osaka',

  /** 宋体 (简) */
  SONGTI_SC = 'songti-sc',

  /** 宋体 (京华老宋) */
  SONGTI_KING_HWA = 'songti-king-hwa',

  /** 楷体 (简) */
  KAITI_SC = 'kaiti-sc',

  /** 楷体 (今) */
  KAITI_JIN = 'kaiti-jin',

  /** 隶书 (简) */
  BAOLI_SC = 'baoli-sc',

  /** 黑体 (兰) */
  HEITI_LAN = 'heiti-lan',

  /** 苹方 (简) */
  PINGFANG_SC = 'pingfang-sc',
}

export interface IFontFamilyOption {
  value: EFontFamily;
  label: React.ReactNode;
  fontFamily: string;
}

export const fontFamilyList: IFontFamilyOption[] = (
  [
    {
      value: EFontFamily.YUMINCHO,
      label: '游明朝体',
      fontFamily: 'YuMincho, 游明朝, "MS 明朝"',
    },
    {
      value: EFontFamily.YUMINCHO_36P_KANA,
      label: '游明朝体 +36ポ かな',
      fontFamily: '"YuMincho +36p Kana", "BIZ UDP明朝", "MS P明朝"',
    },
    {
      value: EFontFamily.HIRAGINO_MINCHO_PRON,
      label: 'ヒラギノ 明朝 ProN',
      fontFamily: '"Hiragino Mincho ProN"',
    },
    {
      value: EFontFamily.YUKYOKASHO,
      label: '游教科書体',
      fontFamily: 'YuKyokasho, "UD デジタル 教科書体 N"',
    },
    {
      value: EFontFamily.YUKYOKASHO_YOKO,
      label: '游教科書体横用',
      fontFamily: '"YuKyokasho Yoko", "UD デジタル 教科書体 NK"',
    },
    {
      value: EFontFamily.KLEE,
      label: 'KLEE (手写体)',
      fontFamily: 'Klee',
    },
    {
      value: EFontFamily.HIRAGINO_SANS,
      label: '傳統黑體',
      fontFamily: '"Hiragino Sans"',
    },
    {
      value: EFontFamily.HIRAGINO_SANS_GB,
      label: '傳統黑體 (GB)',
      fontFamily: '"Hiragino Sans GB"',
    },
    {
      value: EFontFamily.TOPPAN_BUNKYU_GOTHIC,
      label: '凸版文久黑体',
      fontFamily: '"Toppan Bunkyu Gothic"',
    },
    {
      value: EFontFamily.TOPPAN_BUNKYU_MIDASHI_GOTHIC,
      label: '凸版文久黑体 (粗)',
      fontFamily: '"Toppan Bunkyu Midashi Gothic"',
    },
    {
      value: EFontFamily.TOPPAN_BUNKYU_MINCHO,
      label: '凸版文久明朝体',
      fontFamily: '"Toppan Bunkyu Mincho"',
    },
    {
      value: EFontFamily.TOPPAN_BUNKYU_MIDASHI_MINCHO,
      label: '凸版文久明朝体 (粗)',
      fontFamily: '"Toppan Bunkyu Midashi Mincho"',
    },
    {
      value: EFontFamily.HIRAGINO_MARU_GOTHIC_PRON,
      label: 'ヒラギノ 丸ゴ ProN',
      fontFamily: '"Hiragino Maru Gothic ProN"',
    },
    {
      value: EFontFamily.TSUKUSHI_A_ROUND_GOTHIC,
      label: '筑紫 A 丸',
      fontFamily: '"Tsukushi A Round Gothic"',
    },
    {
      value: EFontFamily.TSUKUSHI_B_ROUND_GOTHIC,
      label: '筑紫 B 丸',
      fontFamily: '"Tsukushi B Round Gothic"',
    },
    {
      value: EFontFamily.BIZ_UD_GOTHIC,
      label: '森泽 BIZ UD Gothic',
      fontFamily: '"BIZ UDGothic"',
    },
    {
      value: EFontFamily.BIZ_UD_MINCHO,
      label: '森泽 BIZ UD Mincho',
      fontFamily: '"BIZ UDMincho"',
    },
    {
      value: EFontFamily.OSAKA,
      label: '大阪',
      fontFamily: 'Osaka',
    },
    {
      value: EFontFamily.SONGTI_SC,
      label: '宋体 (简)',
      fontFamily: '"Source Han Serif CN", "Source Han Serif SC", "Songti SC"',
    },
    {
      value: EFontFamily.SONGTI_KING_HWA,
      label: '宋体 (京华)',
      fontFamily: 'KingHwa_OldSong',
    },
    {
      value: EFontFamily.KAITI_SC,
      label: '楷体 (简)',
      fontFamily: '"Kaiti SC"',
    },
    {
      value: EFontFamily.KAITI_JIN,
      label: '楷体 (今)',
      fontFamily: 'TsangerJinKai03, TsangerJinKai02, TsangerJinKai01, DeDaoJinKai',
    },
    {
      value: EFontFamily.BAOLI_SC,
      label: '隶书 (简)',
      fontFamily: '"Baoli SC"',
    },
    {
      value: EFontFamily.HEITI_LAN,
      label: '黑体 (兰)',
      fontFamily: '"Lantinghei SC"',
    },
    {
      value: EFontFamily.PINGFANG_SC,
      label: '苹方 (简)',
      fontFamily: '"PingFang SC"',
    },
  ] as IFontFamilyOption[]
).map(x => {
  const label = (
    <Tooltip title={x.fontFamily.replace(/"/g, '')} placement="right">
      <div style={{ fontFamily: x.fontFamily }}>{x.label}</div>
    </Tooltip>
  );
  return { ...x, label };
});

export const fontFamilyCollection = createEntityCollection(fontFamilyList, x => x.value);
