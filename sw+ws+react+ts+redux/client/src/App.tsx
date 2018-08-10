import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { connect } from "react-redux";
const { Header, Sider, Content } = Layout;
import "./styles/layout.less";
// import SiderCustom from "./components/layout/SiderCustom";
// import HeaderCustom from "./components/layout/HeaderCustom";
// import { receiveData } from './action';
// import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import Routes from "./routes";
import { Link } from "react-router-dom";
import { gio } from "./gio";
// const { Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };

  constructor(props) {
    super(props);
    var onConnect = function() {
      console.log("connected!");
    };

    var onDisConnect = function() {
      console.log("disconnect!");
    };

    var ws = gio("http://localhost:8083", onConnect, onDisConnect);
    ws.setWorker("sharedWorker.js");

    ws.registerEvent("message", data => {
      debugger;
      this.props["updateOrder"](data);
      console.log("message", data);
    });

    ws.onError(function(data) {
      console.log("error", data);
    });

    ws.start();
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    // console.log(this.props.auth);
    // console.log(this.props.responsive);
    // const { auth, responsive } = this.props;
    const contentStyle = {
      margin: "24px 16px",
      padding: 24,
      background: "#fff",
      minHeight: 800
    };

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/app/antDemo">
                <Icon type="user" />
                <span>antDemo</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/app/todolist">
                <Icon type="video-camera" />
                <span>ToDoList</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content style={contentStyle}>
            <Routes />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

// const mapStateToProps = state => {
//   const { auth = { data: {} }, responsive = { data: {} } } = state.httpData;
//   return { auth, responsive };
// };
// const mapDispatchToProps = dispatch => ({
//   // receiveData: bindActionCreators(receiveData, dispatch)
// });

// export default App;

const mapDispatch = dispatch => {
  return {
    updateOrder: dispatch.order.update
  };
};

export default connect(
  null,
  mapDispatch
)(App);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
