import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";

import { init } from "@rematch/core";
import selectorsPlugin from "@rematch/select";
import models from "./models/index";
// import App from "./App";
// import "./styles/index.less";
// import Routes from "./routes";
import createHistory from "history/createHashHistory";
// import { Router } from "react-router";
import Page from "./Page";
import zhCN from "antd/lib/locale-provider/zh_CN";

export const history = createHistory();

const select = selectorsPlugin();

// 初始化store
const store = init({
  models: {
    ...models
  },
  plugins: [select]
});

render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Page />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
