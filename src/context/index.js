import React, { createContext, useMemo, useReducer } from 'react';
import { useContext } from 'react';
import reducer from './reducer';

const initialsState = {
  cart: { total: 0, items: [] },
  auth: { isLogin: false },
};

export const AppContext = createContext({});

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialsState);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
