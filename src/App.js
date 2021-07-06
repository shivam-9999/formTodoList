import React from "react";
import "./App.css";
import { Layout } from "./Components/Redux/container";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reducer from "./Components/Redux/reducer";

import logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

function App() {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
  );

  return (
    <Provider store={store}>
      <Layout />;
    </Provider>
  );
}

export default App;
