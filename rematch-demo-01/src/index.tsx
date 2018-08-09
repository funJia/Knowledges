import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { init } from "@rematch/core";
import * as models from "./models/";
import App from "./App";
import jquery from "jquery";

// 初始化store
const store = init(models);
jquery.get("http://openapi.cattrip.net/V1/user", () => {
  debugger;
});

render(
  // <div>23423</div>,
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
