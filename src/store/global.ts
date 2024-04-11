import { createTinyStore } from '@/utils';

export const GlobalStore = createTinyStore({
  /** 振假名功能是否已就绪？ */
  huriganaizeReady: false,
});

export const useGlobalStore = () => {
  const [globalState, setGlobalState] = GlobalStore.useStore();
  return { globalState, setGlobalState };
};
