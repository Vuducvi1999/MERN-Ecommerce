import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : applyMiddleware(thunk)
  )
);
