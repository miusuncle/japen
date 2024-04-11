declare module 'kuroshiro' {
  /**
   * @link https://www.typescriptlang.org/docs/handbook/modules/reference.html
   */
  import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

  interface KuroshiroConstructor {
    new (): Kuroshiro;
    Util: Util;
  }

  interface Util {
    /** Check if input char is hiragana */
    isHiragana(char: string): boolean;

    /** Check if input char is katakana. */
    isKatakana(char): boolean;

    /** Check if input char is kana. */
    isKana(char: string): boolean;

    /** Check if input char is kanji. */
    isKanji(char: string): boolean;

    /** Check if input char is Japanese. */
    isJapanese(char: string): boolean;

    /** Check if input string has hiragana. */
    hasHiragana(str: string): boolean;

    /** Check if input string has katakana. */
    hasKatakana(str: string): boolean;

    /** Check if input string has kana. */
    hasKana(str: string): boolean;

    /** Check if input string has kanji. */
    hasKanji(str: string): boolean;

    /** Check if input string has Japanese. */
    hasJapanese(str: string): boolean;

    /** Convert input kana string to hiragana. */
    kanaToHiragna(str: string): string;

    /** Convert input kana string to katakana. */
    kanaToKatakana(str): string;

    /**
     * Convert input kana string to romaji
     * @link https://github.com/hexenq/kuroshiro?tab=readme-ov-file#romanization-system
     */
    kanaToRomaji(
      str,

      /**
       * @default RomanizationSystem.HEPBURN
       */
      system?: RomanizationSystem,
    ): string;
  }

  interface Kuroshiro {
    /**
     * Initialize kuroshiro with an instance of analyzer
     * @link https://github.com/hexenq/kuroshiro?tab=readme-ov-file#initanalyzer
     */
    init(analyzer: KuromojiAnalyzer): Promise<void>;

    /**
     * Convert given string to target syllabary with options available
     * @link https://github.com/hexenq/kuroshiro?tab=readme-ov-file#convertstr-options
     */
    convert(str: string, options?: ConvertOptions): Promise<string>;
  }

  export interface ConvertOptions {
    /**
     * Target syllabary
     * @default 'hiragana'
     */
    to?: 'hiragana' | 'katakana' | 'romaji';

    /**
     * Convert mode
     * @default 'normal'
     */
    mode?: 'normal' | 'spaced' | 'okurigana' | 'furigana';

    /**
     * Romanization system
     * @default ERomanizationSystem.HEPBURN
     */
    romajiSystem?: ERomanizationSystem;

    /**
     * Delimiter (Start)
     * @default '('
     */
    delimiter_start?: string;

    /**
     * Delimiter (End)
     * @default ')'
     */
    delimiter_end?: string;
  }

  /**
   * kuroshiro supports three kinds of romanization systems
   */
  export enum ERomanizationSystem {
    /**
     * Nippon-shiki romanization
     * @link http://www.age.ne.jp/x/nrs/iso3602/iso3602.html
     */
    NIPPON = 'nippon',

    /**
     * Passport-shiki romanization
     * @link https://www.ezairyu.mofa.go.jp/passport/hebon.html
     */
    PASSPORT = 'passport',

    /**
     * Hepburn romanization
     * @link https://archive.is/PiJ4
     */
    HEPBURN = 'hepburn',
  }

  const Kuroshiro: KuroshiroConstructor;
  export default Kuroshiro;
}
