import React, { createContext, useContext } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { produce, type Draft } from 'immer';

type UpdateState<S extends Record<string, unknown>> = <K extends keyof S>(
  patch: ((draft: Draft<S>) => void) | Pick<S, K> | S,
) => void;

/**
 * 创建轻量级的 Store，可用于跨组件状态共享
 */
export function createTinyStore<S extends Record<string, unknown>>(initialState: S) {
  const StateContext = createContext<S>(initialState);
  const UpdateContext = createContext<UpdateState<S>>(() => {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('[createTinyStore] Updater was called w/o an enclosing provider.');
    }
  });

  function StoreProvider({ children }: { children?: React.ReactNode }) {
    const [state, setState] = useSafeState(initialState);

    const updateState = useMemoizedFn<UpdateState<S>>(patch => {
      setState(prevState => {
        if (typeof patch === 'function') {
          return produce(prevState, patch);
        }
        return { ...prevState, ...patch };
      });
    });

    return (
      <UpdateContext.Provider value={updateState}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </UpdateContext.Provider>
    );
  }

  function useStore() {
    return [useContext(StateContext), useContext(UpdateContext)] as const;
  }

  return { Provider: StoreProvider, useStore };
}
