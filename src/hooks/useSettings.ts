import { useImmerAtom } from 'jotai-immer';
import { settingsAtom } from '@/store/atoms';

export function useSettings() {
  const [settings, setSettings] = useImmerAtom(settingsAtom);
  return { settings, setSettings };
}
