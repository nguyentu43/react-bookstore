import React, { createContext, useMemo, useReducer } from 'react';
import { useContext } from 'react';

const initialsState = {
  cart: { total: 0, items: [] },
  auth: { isLogin: false },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        auth: action.payload,
      };
    case 'SET_CART':
      const total = action.payload.reduce(
        (prev, item) => prev + item.quantity * item.price * (1 - item.discount),
        0
      );
      return {
        ...state,
        cart: {
          items: action.payload,
          total,
        },
      };
    default:
      throw new Error();
  }
}

export const AppContext = createContext({});

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialsState);
  const contextValue = useMemo(() => ({
    state, dispatch
  }), [state, dispatch]);
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
