import React from "react";
import {
  Card,
  Form,
  Input,
  Radio,
  InputNumber,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  Checkbox,
  Button,
  message
} from "antd";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
class FormRegister extends React.Component {
  state = {
    value: "man"
  };
  handleRadioChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, avatarUrl =>
        this.setState({
          avatarUrl,
          loading: false
        })
      );
    }
  };
  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err,values)=> {
      if(!err) {
        console.log('收到表格的值：',values);
        message.success(`你好，${values.userName}你通过了！`)
      }
    })
  
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };
    return (
      <div>
        <Card title="注册表单">
          <Form {...formLayout}>
            <FormItem label="用户名">
              {getFieldDecorator("userName", {
                rules: [
                  {
                    required: true,
                    message: "请正确输入你的用户名"
                  }
                ]
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>
            <FormItem label="密码">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请正确输入你的密码"
                  }
                ]
              })(<Input placeholder="请输入密码" type="password" />)}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator("sex", {
                initialValue: "man"
              })(
                <RadioGroup>
                  <Radio value="man">男</Radio>
                  <Radio value="woman">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator("age", {
                initialValue: "18"
              })(<InputNumber min={1} max={150} />)}
            </FormItem>
            <FormItem label="当前状态">
              {getFieldDecorator("state", {
                initialValue: "开心"
              })(
                <Select>
                  <Option value="开心">开心</Option>
                  <Option value="难过">难过</Option>
                  <Option value="郁闷">郁闷</Option>
                  <Option value="无聊">无聊</Option>
                  <Option value="奋斗">奋斗</Option>
                  <Option value="慵懒">慵懒</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="爱好">
              {getFieldDecorator("hobby", {
                initialValue: ["read", "lift"]
              })(
                <Select mode="multiple" placeholder="请选择～">
                  <Option value="read">读书</Option>
                  <Option value="travel">旅行</Option>
                  <Option value="lift">举铁</Option>
                  <Option value="movie">电影</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="是否已婚">
              {getFieldDecorator("married", {
                valuePropName: "checked",
                initialValue: false
              })(<Switch checkedChildren="是" unCheckedChildren="否" />)}
            </FormItem>
            <FormItem label="生日">
              {getFieldDecorator("birthday", {
                initialValue: moment("1999-10-10")
              })(<DatePicker />)}
            </FormItem>
            <FormItem label="联系地址">
              {getFieldDecorator("address", {
                initialValue: "XX省YY市ZZ区某小区某栋某某座"
              })(<TextArea placeholder="请输入你的联系地址" />)}
            </FormItem>
            <FormItem label="起床时间">
              {getFieldDecorator("time", {
                initialValue: moment("07:00:00", "HH:mm:ss")
              })(<TimePicker />)}
            </FormItem>
            <FormItem label="头像">
              {getFieldDecorator("avatar", {
                rules: [
                  {
                    required: true,
                    message: "请上传头像"
                  }
                ]
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  {this.state.avatarUrl ? (
                    <img src={this.state.avatarUrl} alt="" />
                  ) : (
                    <Icon type={this.state.loading ? "loading" : "plus"} />
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator("read", {
                valuePropName: "checked",
                rules: [{
                  required: true,
                  message: '请先阅读协议并勾选'
                }]
              })(
                <Checkbox>
                  我已阅读<a href="">某某某协议</a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>
                点击注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(FormRegister);
