import localForage from 'localforage';
import { loadScript } from '@/utils';

type IScriptVersion = `v${number}`;
type IScriptEntry = { content: string; version: IScriptVersion };

const scriptStore = localForage.createInstance({
  name: 'japen', // database
  storeName: 'script', // table
});

export async function loadScriptWithCaching({
  key,
  version,
  src,
}: {
  /** 缓存 KEY */
  key: string;

  /** 缓存版本号 */
  version: IScriptVersion;

  /** 脚本资源链接 */
  src: string;
}) {
  try {
    const scriptEntry = await scriptStore.getItem<IScriptEntry>(key);
    let content: string;

    if (!scriptEntry || scriptEntry.version !== version) {
      content = await fetch(src).then(x => x.text());
      scriptStore.setItem<IScriptEntry>(key, { content, version });
    } else {
      content = scriptEntry.content;
    }

    // eval script
    new Function(`return ${content}`).call(globalThis);
  } catch (err) {
    console.error('[loadScriptWithCaching] error', err);

    // fallback
    await loadScript(src);
  }
}
