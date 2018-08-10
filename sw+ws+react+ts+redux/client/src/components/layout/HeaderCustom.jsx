import React, { Component } from "react";
import { Menu, Icon, Layout, Badge, Popover, Button } from "antd";
import screenfull from "screenfull";
// import { gitOauthToken, gitOauthInfo } from "../axios";
// import { queryString } from "../utils";
// import avater from "../style/imgs/b1.jpg";
import SiderCustom from "./SiderCustom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const { Header, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  state = {
    user: "",
    visible: false
  };

  render() {
    const { path } = this.props;
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default HeaderCustom;
