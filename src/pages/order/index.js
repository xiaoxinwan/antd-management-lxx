import React from "react";
import {
  Card,
  Select,
  Table,
  Button,
  DatePicker,
  Form,
  message,
  Modal
} from "antd";
import axios from "./../../axios/index";
import Utils from "./../../utils/utils";
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
export default class Order extends React.Component {
  state = {
    visible: false,
    result: {}
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
        url: "/order/list",
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        let _this = this;
        if (res.code === 0) {
          res.result.item_list.map((item, index) => (item.key = index));
          this.setState({
            dataSource: res.result.item_list,
            pagination: Utils.pagination(res, current => {
              _this.params.page = current;
              this.requestList();
            }),
            selectedRowKeys: [],
            selectedItem: "",
            selectedIds: ""
          });
        }
      });
  };
  requestDetail = () => {
    let id = this.state.selectedItem.id;
    axios
      .ajax({
        url: "/order/ebike_info",
        data: {
          params: id
        }
      })
      .then(res => {
        if (res.code === 0) {
          this.setState({
            result: res.result
          });
        }
      });
  };
  handleSubmit = () => {
    this.requestList();
  };
  handleRowClick = (record, index) => {
    let selectedKeys = [index];
    this.setState({
      selectedRowKeys: selectedKeys,
      selectedItem: record
    });
  };
  handleGoToDetail = () => {
    let orderId = this.state.selectedItem.id;
    Utils.goToOrderDetail(orderId);
  };
  handleCloseOrder = () => {
    if (!this.state.selectedItem) {
      Utils.ui.alert({ text: "请选择行程中的订单" });
    } else {
      this.requestDetail();
      this.setState({
        visible: true
      });
    }
    if (this.state.selectedItem.status === 2) {
      Utils.ui.alert({ text: "该订单行程已结束" });
    }
  };
  render() {
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn",
        align: "center",
        width: 100
      },
      {
        title: "车辆编号",
        dataIndex: "bike_sn",
        align: "center"
      },
      {
        title: "用户名",
        dataIndex: "user_name",
        align: "center"
      },
      {
        title: "手机号码",
        dataIndex: "mobile",
        align: "center"
      },
      {
        title: "里程",
        dataIndex: "distance",
        align: "center",
        render: distance => {
          return Utils.formatMileage(distance);
        }
      },
      {
        title: "行程时长",
        dataIndex: "total_time",
        align: "center",
        render: Utils.formatTime
      },
      {
        title: "状态",
        dataIndex: "status",
        align: "center",
        render: status => {
          return status === 1 ? "进行中" : "行程结束";
        }
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
        align: "center"
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
        align: "center"
      },
      {
        title: "订单金额",
        dataIndex: "total_fee",
        align: "center",
        render: total_fee => {
          return Utils.formatFee(total_fee);
        }
      },
      {
        title: "实付金额",
        dataIndex: "user_pay",
        align: "center",
        render: user_pay => Utils.formatFee(user_pay)
      }
    ];
    const rowSelection = {
      type: "radio",
      fixed: true,
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };

    return (
      <div>
        <Card>
          <FilterForm handleSubmit={this.handleSubmit} />
        </Card>
        <Card>
          <Button type="primary" onClick={this.handleGoToDetail}>
            订单详情
          </Button>
          <Button type="primary" onClick={this.handleCloseOrder}>
            结束订单
          </Button>
          <Modal
            title="结束订单"
            visible={this.state.visible}
            onCancel={() => this.setState({ visible: false })}
          >
            <FinishForm result={this.state.result} />
          </Modal>
          <Table
            style={{ marginTop: 20 }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.handleRowClick(record, index);
                } // 点击行
              };
            }}
          />
        </Card>
      </div>
    );
  }
}
class FilterForm extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!values.time) {
        message.warning("请选择时间");
      } else {
        message.success(`你选择的时间是${values.time}`);
      }
    });
    this.props.handleSubmit();
  };
  reset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator("city", {
            initialValue: "all"
          })(
            <Select>
              <Option value="all">全部</Option>
              <Option value="beijing">北京</Option>
              <Option value="shanghai">上海</Option>
              <Option value="shenzhen">深圳</Option>
              <Option value="guangzhou">广州</Option>
              <Option value="hangzhou">杭州</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("time")(
            <RangePicker placeholder={["选择开始时间", "选择结束时间"]} />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator("order_state", {
            initialValue: "all"
          })(
            <Select style={{ width: 150 }}>
              <Option value="all">全部</Option>
              <Option value="">进行中</Option>
              <Option value="">进行中（临时锁车）</Option>
              <Option value="">行程结束</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            style={{ marginLeft: 20 }}
            onClick={this.handleSubmit}
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

class FinishForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { result } = this.props;
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    return (
      <Form layout="horizontal" {...formLayout}>
        <FormItem label="车辆编号 ">
          {getFieldDecorator("bike_sn")(<p>{result.bike_sn}</p>)}
        </FormItem>
        <FormItem label="剩余电量">
          {getFieldDecorator("battery")(<p>{result.battery}</p>)}
        </FormItem>
        <FormItem label="行程开始时间">
          {getFieldDecorator("start_time")(<p>{result.start_time}</p>)}
        </FormItem>
        <FormItem label="当前位置">
          {getFieldDecorator("location")(<p>{result.location}</p>)}
        </FormItem>
      </Form>
    );
  }
}
FinishForm = Form.create()(FinishForm);
