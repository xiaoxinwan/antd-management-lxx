import React from "react";
import { Card, Button, notification } from "antd";
import "./ui.less";

export default class Notifications extends React.Component {
  handleOpenNotification = (type, direction = "topRight") => {
    notification[type]({
      message: "你好，要上来吗？",
      description: "欢迎来到XXX场所，尽情享受吧！",
      placement: direction,
      onClick: () => {
        console.log("notification had been clicked");
      }
    });
  };
  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("success")}
          >
            成功Success
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("info")}
          >
            信息Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("warning")}
          >
            警告Warning
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("error")}
          >
            错误Error
          </Button>
        </Card>
        <Card title="通知提醒框-方向控制">
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("success", "topLeft")}
          >
            成功Success-左上
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("info", "topRight")}
          >
            信息Info-右上
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("warning", "bottomLeft")}
          >
            警告Warning-左下
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleOpenNotification("error", "bottomRight")}
          >
            错误Error-右下
          </Button>
        </Card>
      </div>
    );
  }
}
