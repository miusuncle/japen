import { debounce, pick } from 'lodash';
import { atom } from 'jotai';
import type { Simplify } from 'type-fest';
import { decrypt } from '@/utils';
import { store } from '@/store';
import { ETheme, EFontFamily, EWritingMode, type IFormField } from '@/configs/settings';

const SETTINGS_LOCAL_KEY = 'japen:settings';

const DEFAULT_SETTINGS: IFormField = {
  theme: ETheme.DARK,
  fontFamily: EFontFamily.YUMINCHO,
  fontSize: 18,
  writingMode: EWritingMode.VERTICAL_RL,
  huriganaize: false,
  content: '',
  previewPosition: 'left',
};

const defaultSettings: Simplify<IFormField> = (() => {
  try {
    // 优先从 URL Hash 中获取设置
    const settingsFromHash = getSettingsFromHash();
    if (settingsFromHash) {
      // 清除已经使用过的 `hash` 值
      location.hash = '';

      // 顺便写入 `localStorage`
      localStorage.setItem(SETTINGS_LOCAL_KEY, JSON.stringify(settingsFromHash));

      return settingsFromHash;
    }

    const raw = localStorage.getItem(SETTINGS_LOCAL_KEY);
    if (raw) {
      return {
        ...DEFAULT_SETTINGS,
        ...pick(JSON.parse(raw), Object.keys(DEFAULT_SETTINGS)),
      };
    }
  } catch (err) {
    // do nothing
  }

  // 兜底返回默认设置
  return DEFAULT_SETTINGS;
})();

export const settingsAtom = atom(defaultSettings);

/** 从 URL Hash 中获取设置 */
function getSettingsFromHash() {
  try {
    if (location.hash) {
      const encoded = location.hash.slice(1);
      const settings = {
        ...DEFAULT_SETTINGS,
        ...pick(decrypt<IFormField>(encoded), Object.keys(DEFAULT_SETTINGS)),
      };

      if (settings.content) {
        return settings;
      }
    }
  } catch (err) {
    // do nothing
  }

  return null;
}

setTimeout(() => {
  const debouncedUpdateLocal = debounce(
    () => {
      const value = JSON.stringify({
        ...DEFAULT_SETTINGS,
        ...store.get(settingsAtom),
      });
      localStorage.setItem(SETTINGS_LOCAL_KEY, value);
    },
    500,
    { leading: false, trailing: true },
  );

  // 订阅 `settingsAtom` 变化，实时更新 localStorage
  store.sub(settingsAtom, debouncedUpdateLocal);
});
