import React from "react";
import { Card, Table, Button, Modal, message } from "antd";
import axios from "../../axios/index";
import Util from "./../../utils/utils";

export default class BasicTable extends React.Component {
  state = {
    data1: []
  };
  params = {
    page: 1
  };
  componentWillMount() {
    const data = [
      {
        id: "1",
        userName: "xxx",
        sex: "man",
        state: "1",
        hobby: "1",
        isMarry: true,
        birthday: "1999-09-09",
        address: "广东省XX市XX大厦",
        earlyTime: "07:00:00"
      },
      {
        id: "2",
        userName: "xxx",
        sex: "man",
        state: "1",
        hobby: "1",
        isMarry: true,
        birthday: "1999-09-09",
        address: "广东省XX市XX大厦",
        earlyTime: "07:00:00"
      },
      {
        id: "3",
        userName: "xxx",
        sex: "man",
        state: "1",
        hobby: "1",
        isMarry: true,
        birthday: "1999-09-09",
        address: "广东省XX市XX大厦",
        earlyTime: "07:00:00"
      },
      {
        id: "4",
        userName: "xxx",
        sex: "man",
        state: "1",
        hobby: "1",
        isMarry: true,
        birthday: "1999-09-09",
        address: "广东省XX市XX大厦",
        earlyTime: "07:00:00"
      }
    ];
    data.map((item, index) => {
      return (item.key = index);
    });
    this.setState({
      data
    });
    this.request();
  }
  request = () => {
    let _this = this;
    axios
      .ajax({
        url: "/table/list",
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          res.result.list.map((item, index) => {
            return (item.key = index);
          });
          this.setState({
            data1: res.result.list,
            selectedRowKeys: [],
            selectedRows: null,
            pagination: Util.pagination(res, current => {
              _this.params.page = current;
              this.request();
            })
          });
        }
      });
  };
  handleRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey, // 选中的索引
      selectedItem: record // 选中的项
    });
  };
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    if (rows === null) {
      message.warning("请勾选要删除的数据");
      return;
    }
    rows.map(item => {
      return ids.push(item.id);
    });
    Modal.confirm({
      title: "删除",
      content: `是否删除${ids.join("、")}数据？`,
      onOk() {
        message.success("已成功删除");
        this.request();
      }
    });
  };
  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
        // render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "用户名",
        dataIndex: "userName",
        key: "username"
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state",
        render: state => {
          let config = {
            1: "开心",
            2: "难过",
            3: "郁闷",
            4: "无聊",
            5: "奋斗",
            6: "慵懒"
          };
          return config[state];
        }
      },
      {
        title: "爱好",
        dataIndex: "hobby",
        key: "hobby",
        render(hobby) {
          let config = {
            1: "读书",
            2: "旅行",
            3: "举铁",
            4: "电影",
            5: "跑步",
            6: "跳绳",
            7: "骑车",
            8: "追番"
          };
          return config[hobby];
        }
      },
      {
        title: "婚况",
        dataIndex: "isMarry",
        key: "ismarry",
        render(ismarry) {
          return ismarry === 1 ? "已婚" : "未婚";
        }
      },
      {
        title: "生日",
        dataIndex: "birthday",
        key: "birthday"
      },
      {
        title: "通信地址",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "早起时间",
        dataIndex: "earlyTime",
        key: "earlytime"
      }
    ];
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      selectedRowKeys
    };
    const rowCheckSelection = {
      selectedRowKeys: this.state.selectedRowCheckKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowCheckKeys: selectedRowKeys,
          selectedRows
        });
      }
    };
    // const paginationConfig = {
    //   total: this.state.total,
    //   showQuickJumper: true,
    //   defaultCurrent: 1,
    //   onChange(){
    //     console.log('change')
    //   }
    // };
    return (
      <div>
        <Card title="基础表格" style={{ marginBottom: 20 }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.data}
            pagination={false}
            rowKey={record => record.id}
          />
        </Card>
        <Card title="动态数据渲染表格" style={{ marginBottom: 20 }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.data1}
            pagination={false}
          />
        </Card>
        <Card title="Mock表格-单选" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={this.state.data1}
            rowSelection={rowSelection}
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.handleRowClick(record, index);
                } // 点击行
              };
            }}
          />
        </Card>
        <Card title="Mock表格-多选" style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <Button icon="delete" onClick={this.handleDelete} />
          </div>
          <Table
            columns={columns}
            dataSource={this.state.data1}
            rowSelection={rowCheckSelection}
            pagination={false}
          />
        </Card>
        <Card title="Mock表格-分页" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={this.state.data1}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}
