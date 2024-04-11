import { ETheme } from './theme';
import { EFontFamily } from './font-family';
import { EWritingMode } from './writing-mode';

export type IFormField = {
  /** 主题 */
  theme: ETheme;

  /** 字体 */
  fontFamily: EFontFamily;

  /**
   * 字号 (范围: [14-24])
   * @default 18
   */
  fontSize: number;

  /** 版式 */
  writingMode: EWritingMode;

  /** 漢字に振仮名をつける？ */
  huriganaize: boolean;

  /** 内容 */
  content: string;

  /** 预览展示位置 */
  previewPosition: 'left' | 'right';
};
