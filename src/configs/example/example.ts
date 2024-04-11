import type { SetOptional } from 'type-fest';
import { EFontFamily, ETheme, EWritingMode, type IFormField } from '@/configs/settings';
import { preface } from '@/helpers';

export type IExample = SetOptional<
  Pick<IFormField, 'theme' | 'fontFamily' | 'fontSize' | 'writingMode' | 'content'>,
  'theme'
>;

export const exampleList: IExample[] = [
  {
    theme: ETheme.DARK,
    fontFamily: EFontFamily.HIRAGINO_MINCHO_PRON,
    fontSize: 18,
    writingMode: EWritingMode.VERTICAL_RL,
    content: `
${preface.v2()}

比較的奇麗に⁂片づいた⁂部屋だ。小学生の部屋としては、少し⁂地味⁂な感じ⍣さえ⍣する。﹎山口百恵﹎や﹎桜田淳子﹎のポスターは貼られていない。スーパーカーの模型も飾られていない。本棚にマンガはなく、⍣代わりに⍣百科事典や、「自動車のしくみ」、「テレビのしくみ」⍣といった⍣子供向けの科学本が並んでいる。

ᚦ⁽㊥❷‼译‼㊥❷⁾ᚦ

ᚦ⁽㊥❸房间整理得算是相当干净。就小学生的房间而言，甚至给人有点冷清的感觉。房内没有贴山口百惠或樱田淳子的海报，也没有装饰超级跑车图片。书架上没有漫画，只有百科全书、《汽车的构造》《电视的构造》等儿童科普书籍。㊥❸⁾ᚦ
    `.trim(),
  },
];
