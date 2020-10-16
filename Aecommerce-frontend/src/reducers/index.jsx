import { productReducer } from "./products";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  products: productReducer,
});
