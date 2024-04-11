import { useRef, useState, useEffect } from 'react';
import { useLockFn, useMemoizedFn, useCreation } from 'ahooks';
import { App } from 'antd';
import Kuroshiro from 'kuroshiro';
import { useGlobalStore } from '@/store/global';
import { useSettings } from '@/hooks';
import { delay } from '@/utils';
import { loadScriptWithCaching } from '@/helpers';

export function useKuroshiro() {
  const { message } = App.useApp();
  const { setGlobalState } = useGlobalStore();
  const { settings } = useSettings();

  const kuroshiro = useCreation(() => new Kuroshiro(), []);
  const [ready, setReady] = useState(false);

  const busyRef = useRef(false);
  const readyRef = useRef(false);

  const init = useLockFn(
    useMemoizedFn(async () => {
      const loadingKey = 'init-loading';

      try {
        busyRef.current = true;

        message.loading({
          key: loadingKey,
          content: '仮名辞書データを読み込んでいます。しばらくお待ちください。',
          duration: 0,
        });

        const { BASE_URL } = import.meta.env;

        // Not block UI
        await delay(250);

        // Fetch `KuromojiAnalyzer` if needed
        if (!window.KuromojiAnalyzer) {
          printInfo('Fetching `KuromojiAnalyzer`');
          await loadScriptWithCaching({
            key: 'kuroshiro-analyzer-kuromoji',
            version: 'v1',
            src: `${BASE_URL}/assets/kuroshiro-analyzer-kuromoji-1.1.0.min.js`,
          });
          printInfo('Fetched `KuromojiAnalyzer`');
        }

        /**
         * todo: why invalid file signature from zlib.js
         * gzip compressed?
         * @link https://stackoverflow.com/questions/76691769/how-to-use-decompressionstream-to-decompress-a-gzip-file-using-javascript-in-bro?noredirect=1#comment135210702_76691769
         */
        const dictPath = `${BASE_URL}/dict/`;
        const analyzer = new KuromojiAnalyzer({ dictPath });

        printInfo('Initialize `Kuroshiro`');
        await kuroshiro.init(analyzer);
        printInfo('Initialized `Kuroshiro`');

        readyRef.current = true;
        setReady(true);
        setGlobalState({ huriganaizeReady: true });

        printInfo('Ready');
        message.success('仮名辞書データの読み込みに成功しました。');

        // Test ONLY
        Object.assign(globalThis, { kuroshiro });
      } catch (err) {
        printInfo(`Error occurred => ${(err as Error)?.['message'] ?? err}`, 'error');
      } finally {
        busyRef.current = false;
        message.destroy(loadingKey);
      }
    }),
  );

  useEffect(() => {
    if (settings.huriganaize && !busyRef.current && !readyRef.current) {
      init();
    }
  }, [settings.huriganaize, init]);

  return { kuroshiro, ready };
}

function printInfo(message: unknown, type: 'info' | 'error' = 'info') {
  if (import.meta.env.PROD) {
    return;
  }
  console[type](`[kuroshiro] ${message}`);
}
