import { _addToCart, _removeFromCart, _updateItems } from "../core/cartHelpers";
import {
  ADD_TO_CART,
  LOAD_ITEMS,
  REMOVE_FROM_CART,
  UPDATE_ITEMS,
} from "./actionTypes";

export const addToCart = (product) => (dispatch, getState) => {
  if (getState().products.find((p) => p._id === product._id)) return;
  else {
    dispatch({ type: ADD_TO_CART, payload: product });
    _addToCart(product);
    return;
  }
};

export const removeFromCart = (product) => (dispatch, getState) => {
  let items = getState().products;
  items = items.filter((p) => p._id !== product._id);
  dispatch({ type: REMOVE_FROM_CART, payload: items });
  _removeFromCart(product._id);
  return;
};

export const updateItems = (id, count) => (dispatch, getState) => {
  let items = getState().products;
  items = items.map((p) => {
    if (p._id === id) p.quantity = count ? count : 0;
    return p;
  });
  dispatch({ type: UPDATE_ITEMS, payload: items });
  _updateItems(id, count ? count : 0);
  return;
};

export const loadItemsLocalstorage = () => (dispatch, getState) => {
  const items = JSON.parse(localStorage.getItem("cart"));
  dispatch({ type: LOAD_ITEMS, payload: items });
};
