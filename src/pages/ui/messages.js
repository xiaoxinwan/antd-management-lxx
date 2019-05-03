import React from 'react';
import {Card, Button, message} from 'antd';
import './ui.less';

export default class Messages extends React.Component {
  handleMessages = (type) => {
    message[type]('你很厉害，你成功了吧！')
  }
  render() {
    return (
      <div>
        <Card title="全局提示框">
          <Button
            type="primary"
            onClick={() => this.handleMessages("success")}
          >
            Success
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleMessages("info")}
          >
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleMessages("warning")}
          >
            Warning
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleMessages("error")}
          >
            Error
          </Button>
          <Button
            type="primary"
            onClick={() => this.handleMessages("loading")}
          >
            Loading
          </Button>
        </Card>
      </div>
    );
  }
}
