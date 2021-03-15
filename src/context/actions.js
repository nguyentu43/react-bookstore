import { SET_CART, SET_AUTH } from './actionTypes';

export function setCart(payload) {
  return { type: SET_CART, payload };
}

export function setAuth(payload) {
  return { type: SET_AUTH, payload };
}
