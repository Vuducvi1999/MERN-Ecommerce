import { LOAD_ORDERS } from "./../actions/actionTypes";

const initialState = [];

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return [...action.payload];
    default:
      return state;
  }
};
