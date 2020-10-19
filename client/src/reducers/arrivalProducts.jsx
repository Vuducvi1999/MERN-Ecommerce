import { ARRIVAL_ITEMS } from "./../actions/actionTypes";

const initialState = [];

export const arrivalProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARRIVAL_ITEMS:
      return [...action.payload];
    default:
      return state;
  }
};
