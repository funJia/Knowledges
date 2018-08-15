import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
const { Header, Sider, Content } = Layout;

// import "./styles/layout.less";
// import SiderCustom from "./components/layout/SiderCustom";
// import HeaderCustom from "./components/layout/HeaderCustom";
// import { receiveData } from './action';
// import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
// import Routes from "./routes";
// import { Link } from "react-router-dom";
// import Hotkeys from "react-hot-keys";
// const { Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onKeyDown = (keyName, e, handle) => {
    console.log("onkeyDown", keyName);
  };

  render() {
    // console.log(this.props.auth);
    // console.log(this.props.responsive);
    // const { auth, responsive } = this.props;
    const contentStyle = {
      margin: "24px 16px",
      padding: 24,
      background: "#fff"
      // minHeight: 800
    };

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">1312</Menu.Item>
            <Menu.Item key="2">23432</Menu.Item>
            <Menu.Item key="3">23432</Menu.Item>
            <Menu.Item key="4">234324</Menu.Item>
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
          <Content style={contentStyle} />
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

export default App;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
