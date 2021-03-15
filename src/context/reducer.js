import { SET_AUTH, SET_CART } from './actionTypes';

export default function reducer(state, action) {
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
      throw new Error('action type not found');
  }
}
