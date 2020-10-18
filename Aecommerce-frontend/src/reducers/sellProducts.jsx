import { SELL_ITEMS } from "./../actions/actionTypes";

const initialState = [];

export const sellProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELL_ITEMS:
      return [...action.payload];
    default:
      return state;
  }
};
