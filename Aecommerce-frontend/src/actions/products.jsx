import { API_URL } from "../config";
import {
  _addToCart,
  _removeFromCart,
  _resetItems,
  _updateItems,
} from "../core/cartHelpers";
import {
  ADD_TO_CART,
  ARRIVAL_ITEMS,
  LOAD_ITEMS,
  LOAD_REVIEWS,
  REMOVE_FROM_CART,
  RESET_ITEMS,
  SELL_ITEMS,
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
  dispatch({ type: LOAD_ITEMS, payload: items ? items : [] });
  return;
};

export const resetItems = () => (dispatch) => {
  dispatch({ type: RESET_ITEMS, payload: [] });
  _resetItems();
};

export const loadProducts = (sortBy, order = "desc", limit = 100) => (
  dispatch,
  getState
) => {
  fetch(`${API_URL}/products?sortBy=${sortBy}&order=${order}&limit=${limit}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (sortBy === "createdAt")
        dispatch({ type: ARRIVAL_ITEMS, payload: data });
      else dispatch({ type: SELL_ITEMS, payload: data });
    })
    .catch((err) => console.log(err));
};

export const loadReviews = (data) => (dispatch) => {
  dispatch({ type: LOAD_REVIEWS, payload: data });
};
