import { LOAD_REVIEWS } from "./../actions/actionTypes";

const initialState = [];

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return [...action.payload];
    default:
      return state;
  }
};
