import React from "react";
import { Card, Table, Modal, message } from "antd";

export default class HighTable extends React.Component {
  componentWillMount() {
    const data = [];
    for (let i = 1; i < 50; i++) {
      data.push({
        key: i,
        id: i,
        userName: "Mikasa",
        state: `开心${i}`,
        hobby: `跑山${i}`,
        birthday: `20${i}-10-10`,
        address: "广东省江门市新会区"
      });
    }

    const leftData = [];
    for (let i = 1; i < 50; i++) {
      leftData.push({
        key: i,
        id: i,
        userName: "xxx",
        sex: "man",
        state: "1",
        hobby: "1",
        isMarry: "未婚",
        birthday: "1999-09-09",
        address: "广东省XX市XX大厦",
        earlyTime: "07:00:00",
        xstate: "1",
        xhobby: "1",
        xisMarry: "已婚"
      });
    }
    const sortData = [
      {
        key: 1,
        id: 1,
        age: 18,
        state: "开心难过郁闷",
        birthday: "10-10"
      },
      {
        key: 2,
        id: 2,
        age: 22,
        state: "开心难过",
        birthday: "10-10"
      },
      {
        key: 3,
        id: 3,
        age: 44,
        state: "开心",
        birthday: "10-10"
      },
      {
        key: 4,
        id: 4,
        age: 11,
        state: "开心难过郁闷慵懒",
        birthday: "10-10"
      },
      {
        key: 5,
        id: 5,
        age: 23,
        state: "开心难过郁闷",
        birthday: "10-10"
      }
    ];
    const operData = [];
    for (let i = 1; i < 10; i++) {
      operData.push({
        key: i,
        id: i,
        name: `lxx${i}`,
        sex: "男",
        hobby: `钓鱼${i}`
      });
    }
    this.setState({
      dataSource: data,
      leftData,
      sortData,
      operData
    });
  }
  handleDelete = key => {
    Modal.confirm({
      title: "删除数据",
      content: `是否删除第${key}项数据`,
      onOk:()=>{
        const operData = [...this.state.operData];
        this.setState({
          operData: operData.filter(item => item.key !== key)
        },()=>{
          message.success(`已成功删除第${key}项数据`)
        });
      },
      onCancel() {
        console.log('cancel')
      }
    });
  };
  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 50
      },
      {
        title: "用户名",
        dataIndex: "userName",
        key: "username",
        width: 150
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state",
        width: 150
      },
      {
        title: "爱好",
        dataIndex: "hobby",
        key: "hobby",
        width: 150
      },
      {
        title: "生日",
        dataIndex: "birthday",
        key: "birthday",
        width: 150
      },
      {
        title: "通信地址",
        dataIndex: "address",
        key: "address",
        width: 150
      }
    ];
    const leftColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        fixed: "left",
        width: 100
      },
      {
        title: "用户名",
        dataIndex: "userName",
        key: "username",
        fixed: "left",
        width: 100
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex"
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state"
      },
      {
        title: "爱好",
        dataIndex: "hobby",
        key: "hobby"
      },
      {
        title: "婚况",
        dataIndex: "isMarry",
        key: "ismarry"
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
      },
      {
        title: "状态",
        dataIndex: "xstate",
        key: "xstate"
      },
      {
        title: "爱好",
        dataIndex: "xhobby",
        key: "xhobby"
      },
      {
        title: "婚况",
        dataIndex: "xisMarry",
        key: "xismarry",
        fixed: "right",
        width: 100
      }
    ];
    const sortColumns = [
      {
        title: "ID",
        dataIndex: "id"
      },
      {
        title: "年龄",
        dataIndex: "age",
        // defaultSortOrder: "descend",
        sorter: (a, b) => a.age - b.age,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "状态",
        dataIndex: "state",
        sorter: (a, b) => a.state.length - b.state.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "生日",
        dataIndex: "birthday"
      }
    ];
    const operColumns = [
      {
        title: "ID",
        dataIndex: "id"
      },
      {
        title: "姓名 ",
        dataIndex: "name"
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "爱好",
        dataIndex: "hobby"
      },
      {
        title: "操作",
        dataIndex: "operate",
        render: (text, record) => (
          <a href="javascript:;" onClick={() => this.handleDelete(record.key)}>
            删除
          </a>
        )
      }
    ];
    return (
      <div>
        <Card title="头部固定" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            scroll={{ y: 300 }}
            pagination={{ pageSize: 25 }}
          />
        </Card>
        <Card title="左侧固定">
          <Table
            columns={leftColumns}
            dataSource={this.state.leftData}
            scroll={{ x: 1300 }}
          />
        </Card>
        <Card title="排序">
          <Table
            columns={sortColumns}
            dataSource={this.state.sortData}
            pagination={false}
          />
        </Card>
        <Card title="操作按钮">
          <Table
            bordered
            pagination={false}
            columns={operColumns}
            dataSource={this.state.operData}
          />
        </Card>
      </div>
    );
  }
}
