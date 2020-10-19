import {
  ADD_TO_CART,
  LOAD_ITEMS,
  REMOVE_FROM_CART,
  RESET_ITEMS,
  UPDATE_ITEMS,
} from "./../actions/actionTypes";

const initialState = [];

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case REMOVE_FROM_CART:
      return [...action.payload];
    case UPDATE_ITEMS:
      return [...action.payload];
    case LOAD_ITEMS:
      return [...action.payload];
    case RESET_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
