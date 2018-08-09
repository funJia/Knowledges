import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { init } from "@rematch/core";
import selectorsPlugin from "@rematch/select";
import models from "./models/index";
import App from "./App";
import "./styles/index";

const select = selectorsPlugin();

// 初始化store
const store = init({
  models: {
    ...models
  },
  plugins: [select]
});

render(
  // <div>23423</div>,
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
