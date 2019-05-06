import React from "react";
import { Card, Table, Form, Select, Button, Radio, Modal, message } from "antd";
import axios from "./../../axios/index";
import Util from "./../../utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component {
  state = {
    visible: false
  };
  params = {
    page: 1
  };
  componentWillMount() {
    this.requestList();
  }
  requestList = () => {
    axios
      .ajax({
        url: "/open_city",
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        let _this = this;
        if (res.code === 0) {
          res.result.item_list.map((item, index) => {
            return (item.key = index);
          });
          this.setState({
            dataSource: res.result.item_list,
            pagination: Util.pagination(res, current => {
              _this.params.page = current;
              this.requestList();
            })
          });
        }
      });
  };
  handleOpenCity = () => {
    this.setState({
      visible: true
    });
  };
  handleCitySubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    axios
      .ajax({
        url: "/city/open",
        data: {
          params: cityInfo
        }
      })
      .then(res => {
        if (res.code === 0) {
          message.success(res.message);
          this.setState({
            visible: false
          });
          this.requestList();
        }
      });
  };
  handleFilterSubmit = () => {
    this.requestList();
  };
  render() {
    const columns = [
      {
        title: "城市ID",
        dataIndex: "id",
        align: "center"
      },
      {
        title: "城市名称",
        dataIndex: "name",
        align: "center"
      },
      {
        title: "用车模式",
        dataIndex: "mode",
        render: mode => {
          let config = {
            1: "停车点",
            2: "禁停区"
          };
          return config[mode];
        },
        align: "center"
      },
      {
        title: "营运模式",
        dataIndex: "op_mode",
        render: op_mode => {
          let config = {
            1: "自营",
            2: "加盟"
          };
          return config[op_mode];
        },
        align: "center"
      },
      {
        title: "授权加盟商",
        dataIndex: "franchisee_name",
        align: "center"
      },
      {
        title: "城市管理员",
        dataIndex: "city_admins",
        render: city_admins => {
          let adminList = [];
          city_admins.map(item => {
            adminList.push(item.user_name);
          });
          return adminList.join(",");
        },
        align: "center"
      },
      {
        title: "城市开通时间",
        dataIndex: "open_time",
        align: "center"
      },
      {
        title: "操作时间",
        dataIndex: "update_time",
        render: update_time => Util.formatDate(update_time),
        align: "center"
      },
      {
        title: "操作人员",
        dataIndex: "sys_user_name",
        align: "center"
      }
    ];
    return (
      <div>
        <Card style={{ marginBottom: 20 }}>
          <FilterForm handleFilterSubmit={this.handleFilterSubmit} />
        </Card>
        <Card>
          <Button icon="plus" type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
          <Modal
            title="添加开通城市"
            visible={this.state.visible}
            onOk={this.handleCitySubmit}
            onCancel={() => {
              this.setState({
                visible: false
              });
            }}
          >
            <OpenCityForm
              wrappedComponentRef={inst => (this.cityForm = inst)}
            />
          </Modal>
        </Card>
        <Card>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}

class FilterForm extends React.Component {
  handleFilterSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      message.info("已提交查询，请稍候！");
    });
    this.props.handleFilterSubmit();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city", {
            initialValue: "all"
          })(
            <Select style={{ width: 100 }}>
              <Option value="all">全部</Option>
              <Option value="shanghai">上海</Option>
              <Option value="beijing">北京</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式">
          {getFieldDecorator("use_mode", {
            initialValue: "all"
          })(
            <Select style={{ width: 140 }}>
              <Option value="all">全部</Option>
              <Option value="select">指定停车点模式</Option>
              <Option value="forbid">禁停区模式</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式">
          {getFieldDecorator("service", {
            initialValue: "all"
          })(
            <Select style={{ width: 80 }}>
              <Option value="all">全部</Option>
              <Option value="self">自营</Option>
              <Option value="join">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="加盟商授权状态">
          {getFieldDecorator("auth", {
            initialValue: "all"
          })(
            <Select style={{ width: 100 }}>
              <Option value="all">全部</Option>
              <Option value="yes">已授权</Option>
              <Option value="no">未授权</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            style={{ marginLeft: 20 }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create()(FilterForm);

class OpenCityForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    return (
      <Form layout="horizontal" {...formLayout}>
        <FormItem label="选择城市">
          {getFieldDecorator("selectCity", {
            initialValue: "all"
          })(
            <Select style={{ width: 100 }}>
              <Option value="all">全部</Option>
              <Option value="shanghai">上海</Option>
              <Option value="beijing">北京</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式">
          {getFieldDecorator("op_mode", {
            initialValue: "self"
          })(
            <Radio.Group>
              <Radio value="self">自营</Radio>
              <Radio value="join">加盟</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="用车模式">
          {getFieldDecorator("mode", {
            initialValue: "select"
          })(
            <Radio.Group>
              <Radio value="select">指定停车点模式</Radio>
              <Radio value="forbib">禁停区模式</Radio>
            </Radio.Group>
          )}
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create()(OpenCityForm);
