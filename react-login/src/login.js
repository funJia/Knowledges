import "./login.css";
import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";

const FormItem = Form.Item;

class Login extends React.Component {
  state={
    codeUrl:"",
    disabled:false,
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // 提交
        if (window.loginMg) {
          this.setState({
            disabled:true
          })
          window.loginMg.submit(values,()=>{
            this.setState({
              disabled:false
            })
          });
        }
      }
    });
  };

  componentDidMount(){
    // 更新验证码
    if(window.loginMg)
    {
      // 初始化更新验证码的方法
      window.loginMg.setCode=(codeUrl)=>{
        this.setState({
          codeUrl:codeUrl
        });
      }

      // 初始化消息提示方法
      window.loginMg.successMsg=(msg)=>{
        message.success(msg);
      }

      
      // 初始化消息提示方法
      window.loginMg.errorMsg=(msg)=>{
        message.error(msg);
      }

      // 账号密码组件刷新后触发该组件的监听事件
      window.loginMg.tabAccount();
    }    
  }

  // 刷新验证码
  refreshValidateCode=()=>{
    if(window.loginMg)
    {
      window.loginMg.refreshCode((codeUrl)=>{
        this.setState({
          codeUrl:codeUrl
        });
      });
    }
  }

  

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
          })(
            
          <div className="validate-row"><Input placeholder="验证码" style={{ width: 80 }}></Input>
          <img
            className="validate-code"
            src={this.state.codeUrl}
          />
          <a className="login-form-code" href="javascript:void(0)" onClick={this.refreshValidateCode}>
            看不清换一张
          </a>
          </div>)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={this.state.disabled}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Login);
