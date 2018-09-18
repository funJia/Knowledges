import "./App.css";
import logo from "./logo.svg";
import Login from "./login";
import React, { Component } from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="logo">
        <div className="logo-container">
          <Tabs defaultActiveKey="1">
            <TabPane className="qrcode-panel" tab="二维码登录" key="1">
              <img src="https://qr.api.cli.im/qr?data=http%253A%252F%252Fwww.baidu.com&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=1d654768e833ea12c3e7d7c2873ec606" />
            </TabPane>
            <TabPane tab="账号密码登录" key="2">
              <Login />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
