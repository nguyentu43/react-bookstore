import { SET_AUTH, SET_CART } from './actionTypes';

const initialsState = {
  cart: { total: 0, items: [] },
  auth: { isLogin: false },
};

export default function reducer(state = initialsState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case SET_CART:
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
      return state;
  }
}
