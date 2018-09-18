import "./App.css";
import  "babel-polyfill"
import Login from "./login";
import React, { Component } from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
const TabPane = Tabs.TabPane;



class App extends Component {
  state={
    qrUrl:""
  }
  componentDidMount(){  

    if(window.loginMg)
    {      
      window.loginMg.setQR=(url)=>{
        this.setState({
          qrUrl:url
        });
      }

      window.loginMg.tabQR();
    }
  }

  render() {
    return (
      <div className="logo">
        <div className="logo-container">
          <Tabs defaultActiveKey="1">
            <TabPane className="qrcode-panel" tab="扫码登录" key="1">
              <img src={this.state.qrUrl} alt="二维码图片" />
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
