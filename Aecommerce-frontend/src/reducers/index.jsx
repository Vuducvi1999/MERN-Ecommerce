import { productReducer } from "./products";
import { combineReducers } from "redux";
import { arrivalProductReducer } from "./arrivalProducts";
import { sellProductReducer } from "./sellProducts";
import { reviewsReducer } from "./reviews";

export const rootReducer = combineReducers({
  products: productReducer,
  arrival: arrivalProductReducer,
  sell: sellProductReducer,
  review: reviewsReducer,
});
