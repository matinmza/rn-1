import * as React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { init } from "./helper/db";
import Navigation from "./navigation/Navigation";
import placesReducer from "./store/places-reducer";

const rootReducer = combineReducers({
  places: placesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

init()
  .then(() => {
    console.log("Initial database");
  })
  .catch((err) => {
    console.log("error in initial database");
    console.log(err, "err");
  });
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
