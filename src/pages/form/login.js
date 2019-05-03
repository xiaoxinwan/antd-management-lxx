import React from "react";
import { Card, Form, Icon, Input, Button, Checkbox } from "antd";

class FormLogin extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单" style={{ marginBottom: 20 }}>
          <Form layout="inline">
            <Form.Item>
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">登录</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{ marginBottom: 20 }}>
          <Form style={{ width: 300 }}>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "请输入你的密码！！！" },
                  { min: 5, max: 10, message: "长度不在范围内" },
                  {
                    pattern: new RegExp("^\\w+$", "g"),
                    message: "用户名必须为字母或数字"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入你的密码！！！" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="请输入密码"
                  type="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a href="" style={{ float: "right" }}>
                忘记密码
              </a>
              <Button type="primary" style={{ width: "100%" }}>
                登录
              </Button>
            </Form.Item>
            <Form.Item />
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);
