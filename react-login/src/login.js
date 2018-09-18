import "./login.css";
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // 提交
        if (window.submit) {
          window.submit(values);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "请输入账号！" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="账号"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码！" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("code", {
            rules: [{ required: true, message: "请输入验证码！" }]
          })(<Input placeholder="验证码" style={{ width: 80 }} />)}
          <img
            className="validate-code"
            src="http://admin.cattrip.net/user/validateCode"
          />
          <a className="login-form-code" href="">
            看不清换一张
          </a>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Login);
