/**
 * 将万年不变的 `假名字典数据 (12 个文件，共 17.8M)` 缓存到 IndexDB 中，
 * 避免每次打开页面都发起 HTTP 请求进行拉取
 */

import { escapeRegExp } from 'lodash';
import localForage from 'localforage';

type IDictVersion = `v${number}`;
type IDictEntry = { data: ArrayBuffer; version: IDictVersion };

/** 当前字典数据的版本号 */
const DICT_VERSION = 'v1' satisfies IDictVersion;

void (global => {
  const OriginalXHR = global.XMLHttpRequest;
  type IXhrOpenArgs = Parameters<typeof OriginalXHR.prototype.open>;

  const dictStore = localForage.createInstance({
    name: 'japen', // database
    storeName: 'dict', // table
  });

  /**
   * Strictly match pattern `/japen/dict/base.dat.gz` for example
   */
  const rDictEntryPath = new RegExp(
    `^${escapeRegExp(`${import.meta.env.BASE_URL}/dict/`)}(\\w+\\.dat\\.gz)$`,
  );

  class PatchedXHR extends OriginalXHR {
    #method: string | null = null;
    #url: string | null = null;
    #response: ArrayBuffer | null = null;

    constructor() {
      super();

      this.addEventListener('load', () => {
        if (this.readyState !== super.DONE && this.status !== 200) {
          return;
        }

        const dictDataKey = this.#getDictDataKey();
        if (dictDataKey) {
          // Cache data
          dictStore.setItem<IDictEntry>(dictDataKey, {
            data: this.response,
            version: DICT_VERSION,
          });
        }
      });
    }

    open(...args: unknown[]) {
      // Capture `method` and `url`
      {
        const [method, url, async] = args as IXhrOpenArgs;
        if (async && typeof url === 'string') {
          this.#method = String(method).toUpperCase();
          this.#url = url;
        }
      }

      super.open(...(args as IXhrOpenArgs));
    }

    async send(body?: Document | XMLHttpRequestBodyInit | null | undefined) {
      try {
        const dictDataKey = this.#getDictDataKey();
        if (!dictDataKey) {
          // No cached data yet, issue request directly
          super.send(body);
          return;
        }

        const result = await dictStore.getItem<IDictEntry>(dictDataKey);
        if (!result || result.version !== DICT_VERSION) {
          // No cached data yet or version not matched, issue request too
          super.send(body);
          return;
        }

        // Use cached data
        this.#rewriteResponse(result.data);

        // Manually call `onload` method if has any
        this.onload?.(null!);
      } catch (err) {
        // do nothing;
      }
    }

    get response() {
      return this.#response ?? super.response;
    }

    #rewriteResponse(response: ArrayBuffer) {
      this.#response = response;
    }

    #getDictDataKey(): string | false {
      if (this.responseType !== 'arraybuffer') {
        return false;
      }

      if (this.#method !== 'GET' || !this.#url) {
        return false;
      }

      try {
        const { pathname } = new URL(this.#url, document.baseURI);
        const found = pathname.match(rDictEntryPath);
        return found?.[1] ?? false;
      } catch (err) {
        return false;
      }
    }
  }

  Object.assign(global, { XMLHttpRequest: PatchedXHR });
})(globalThis);
