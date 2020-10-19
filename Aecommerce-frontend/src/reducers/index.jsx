import { productReducer } from "./products";
import { combineReducers } from "redux";
import { arrivalProductReducer } from "./arrivalProducts";
import { sellProductReducer } from "./sellProducts";
import { reviewsReducer } from "./reviews";
import { ordersReducer } from "./orders";

export const rootReducer = combineReducers({
  products: productReducer,
  arrival: arrivalProductReducer,
  sell: sellProductReducer,
  review: reviewsReducer,
  order: ordersReducer,
});
