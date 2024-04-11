import './index.less';
import '@/roaming/patch-xhr-for-caching-dict-data';

import ReactDOM from 'react-dom/client';
import Kuroshiro from 'kuroshiro';
import { Provider as JotaiProvider } from 'jotai';
import { store } from '@/store';
import { GlobalStore } from '@/store/global';
import * as utils from '@/utils';
import * as helpers from '@/helpers';
import { transform } from '@/transform';
import * as objects from './objects';
import { App } from './App';

Object.assign(globalThis, {
  jape: {
    utils,
    helpers,
    transform,
    Kuroshiro,
  },

  japen: objects,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <JotaiProvider store={store}>
    <GlobalStore.Provider>
      <App />
    </GlobalStore.Provider>
  </JotaiProvider>,
);
