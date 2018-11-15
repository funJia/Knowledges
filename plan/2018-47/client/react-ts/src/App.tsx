import * as React from "react";
import "./App.css";
import { gio } from "./gio";
import logo from "./logo.svg";
import "./styles/iconfont/iconfont.css";
import SysNotice from "./SysNotice";
import AbnormalNotice from "./AbnormalNotice";
import OrderUpdNotice from "./OrderUpdNotice";
import NCSNotice from "./NCSNotice";
import "./abnormalNotice.css";

class App extends React.Component {
  // 连接sharedWorker
  connetSharedWorker = () => {
    var onConnect = function() {
      console.log("connected!");
    };

    var onDisConnect = function() {
      console.log("disconnect!");
    };

    // const token = Cookies.get("isg");
    ////debugger;
    var ws = gio("ws://192.168.100.124:8083", onConnect, onDisConnect);
    ws.setWorker("/sharedWorker.js");

    ws.registerEvent("message", data => {
      //      this.props["updateOrder"](data);
      console.log("message", data);
      // noticeEnhance.handleNotice(data);

      const jsonData = JSON.parse(data);
      // 系统登录通知
      if (
        jsonData.type == 1 &&
        jsonData.isPopup &&
        !jsonData.to &&
        !jsonData.form
      ) {
        SysNotice.show(jsonData);
      } else if (jsonData.type == 2) {
        // 异常订单
        AbnormalNotice.show(jsonData);
      } else if (jsonData.type == 3) {
        // 满员订单
        OrderUpdNotice.show(jsonData);
      } else if (jsonData.type == 1 && jsonData.form) {
        // 客服消息  xxx@你
        NCSNotice.show(jsonData);
      }
    });

    ws.onError(function(data) {
      console.log("error", data);
    });

    ws.start();
  };

  componentWillMount() {
    this.connetSharedWorker();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">1Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
