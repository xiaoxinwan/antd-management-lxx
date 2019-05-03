import React from "react";
import { Card, Spin, Alert, Icon } from "antd";
import "./ui.less";

export default class Loadings extends React.Component {
  render() {
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small" className="spin-self" />
          <Spin style={{ margin: "0 15px" }} />
          <Spin size="large" className="spin-self" />
          <Spin
            indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
            style={{ marginLeft: 15 }}
          />
        </Card>
        <Card title="内容遮罩" className="card-wrap">
          <Alert
            showIcon
            message="你好！"
            type="info"
            description="欢迎来到Lxx的MS！！！"
            style={{ marginBottom: 15 }}
          />
          <Spin spinning={true}>
            <Alert
              showIcon
              message="你好！"
              type="info"
              description="欢迎来到Lxx的MS！！！"
              style={{ marginBottom: 15 }}
            />
          </Spin>
          <Spin tip="加载中">
            <Alert
              showIcon
              message="你好！"
              type="info"
              description="欢迎来到Lxx的MS！！！"
              style={{ marginBottom: 15 }}
            />
          </Spin>
          <Spin
            indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
          >
            <Alert
              showIcon
              message="你好！"
              type="info"
              description="欢迎来到Lxx的MS！！！"
              style={{ marginBottom: 15 }}
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
