import React from "react";
import { Card, Button, Modal } from "antd";
import './ui.less';

const confirm = Modal.confirm;
export default class Modals extends React.Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
    loading: false
  };
  handleOpen = type => {
    this.setState({
      [type]: true
    });
  };
  handleOk = type => {
    this.setState({
      [type]: false
    });
  };
  handleCancel = type => {
    this.setState({
      [type]: false
    });
  };
  handleSubmit() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        showModal2: false
      });
    }, 3000);
  }
  handleShowConfirm = () => {
    confirm({
      title: "确定吗？",
      content: "你需要学习吗？",
      onOk() {
        console.log("ok");
      },
      onCancel() {
        console.log("cancel");
      }
    });
  };
  handleConfirmInfo = () => {
    Modal.info({
      title: "确定吗？",
      content: <p>走走走，学习去？</p>,
      onOk() {}
    });
  };
  handleConfirmSuccess = () => {
    Modal.success({
      title: "确定吗？",
      content: <p>走走走，学习去？</p>,
      onOk() {}
    });
  };
  handleConfirmError = () => {
    Modal.error({
      title: "确定吗？",
      content: <p>走走走，学习去？</p>,
      onOk() {}
    });
  };
  handleConfirmWarning = () => {
    Modal.warning({
      title: "确定吗？",
      content: <p>走走走，学习去？</p>,
      onOk() {}
    });
  };
  render() {
    return (
      <div>
        <Card title="基础对话框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleOpen("showModal1")}>
            点开
          </Button>
          <Modal
            title="React"
            visible={this.state.showModal1}
            onOk={() => this.handleOk("showModal1")}
            onCancel={() => this.handleCancel("showModal1")}
          >
            <p> 欢迎来到Lxx的MS！</p>
          </Modal>
          <Button type="primary" onClick={() => this.handleOpen("showModal2")}>
            自定义页脚
          </Button>
          <Modal
            title="React"
            visible={this.state.showModal2}
            onOk={() => this.handleOk("showModal2")}
            onCancel={() => this.handleCancel("showModal2")}
            footer={[
              <Button key="back" onClick={() => this.handleOk("showModal2")}>
                走了
              </Button>,
              <Button
                type="primary"
                key="submit"
                loading={this.state.loading}
                onClick={() => this.handleSubmit()}
              >
                可以
              </Button>
            ]}
          >
            <p> 欢迎来到Lxx的MS！</p>
          </Modal>
          <Button type="primary" onClick={() => this.handleOpen("showModal3")}>
            顶部20px弹框
          </Button>
          <Modal
            title="React"
            style={{ top: 20 }}
            visible={this.state.showModal3}
            onOk={() => this.handleOk("showModal3")}
            onCancel={() => this.handleCancel("showModal3")}
          >
            <p>欢迎来到Lxx的MS！</p>
          </Modal>
          <Button type="primary" onClick={() => this.handleOpen("showModal4")}>
            水平垂直居中
          </Button>
          <Modal
            title="React"
            centered
            visible={this.state.showModal4}
            onOk={() => this.handleOk("showModal4")}
            onCancel={() => this.handleCancel("showModal4")}
          >
            <p>欢迎来到Lxx的MS！</p>
          </Modal>
        </Card>

        <Card title="信息确认框" className="card-wrap">
          <Button type="primary" onClick={this.handleShowConfirm}>
            Confirm
          </Button>
          <Button type="primary" onClick={this.handleConfirmInfo}>
            Info
          </Button>
          <Button type="primary" onClick={this.handleConfirmSuccess}>
            Success
          </Button>
          <Button type="primary" onClick={this.handleConfirmError}>
            Error
          </Button>
          <Button type="primary" onClick={this.handleConfirmWarning}>
            Warning
          </Button>
        </Card>
      </div>
    );
  }
}
