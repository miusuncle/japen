declare interface Window {
  KuromojiAnalyzer: KuromojiAnalyzerConstructor;
}

declare const KuromojiAnalyzer: KuromojiAnalyzerConstructor;

type KuromojiAnalyzerConstructor = new (options?: {
  /**
   * Path of the dictionary files
   * @default 'node_modules/kuromoji/dict/'
   */
  dictPath?: string;
}) => KuromojiAnalyzer;

interface KuromojiAnalyzer {
  /**
   * Initialize the analyzer
   */
  init(): Promise<void>;

  /**
   * Parse the given string
   */
  parse(str: string): Promise<TokenizedEntry[]>;
}

/**
 * @link https://github.com/takuyaa/kuromoji.js/blob/master/src/util/IpadicFormatter.js
 */
interface TokenizedEntry {
  /**
   * 表層形
   * @example '黒白'
   */
  surface_form: string;

  /**
   * 品詞 (part of speech)
   * @example '名詞'
   */
  pos: string;

  /**
   * 品詞細分類1
   * @example '一般'
   */
  pos_detail_1: string;

  /**
   * 品詞細分類2
   * @example '*'
   */
  pos_detail_2: string;

  /**
   * 品詞細分類3
   * @example '*'
   */
  pos_detail_3: string;

  /**
   * 活用型
   * @example '*'
   */
  conjugated_type: string;

  /**
   * 活用形
   * @example '*'
   */
  conjugated_form: string;

  /**
   * 基本形
   * @example '黒白'
   */
  basic_form: '黒白';

  /**
   * 読み
   * @example 'クロシロ'
   */
  reading: string;

  /**
   * 発音
   * @example 'クロシロ'
   */
  pronunciation: string;

  /** Other properties */
  verbose: {
    /**
     * @example 413560
     */
    word_id: number;

    /**
     * @example 'KNOWN'
     */
    word_type: string;

    /**
     * @example 1
     */
    word_position: number;
  };
}
