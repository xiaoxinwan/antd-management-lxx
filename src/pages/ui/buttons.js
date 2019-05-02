import React from "react";
import { Card, Button, Icon, Radio } from "antd";
import "./ui.less";

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
export default class Buttons extends React.Component {
  state = {
    loading: false,
    size: "small"
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };
  closeLoading = () => {
    this.setState({ loading: false });
  };
  onChange = e => {
    console.log("radio checked", e.target.size);
    this.setState({
      size: e.target.value
    });
  };
  render() {
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">Lxx</Button>
          <Button>Lxx</Button>
          <Button type="dashed">Lxx</Button>
          <Button type="danger">Lxx</Button>
          <Button type="disabled">Lxx</Button>
        </Card>
        <Card title="图形按钮" className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑 </Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search" />
          <Button type="primary" icon="search">
            搜索
          </Button>
        </Card>
        <Card title="Loading按钮" className="card-wrap">
          <Button type="primary" loading={this.state.loading}>
            确定
          </Button>
          <Button shape="circle" loading={this.state.loading} />
          <Button onClick={this.enterLoading}>点击加载</Button>
          <Button type="primary" shape="circle" loading={this.state.loading} />
          <Button type="primary" onClick={this.closeLoading}>
            关闭
          </Button>
        </Card>
        <Card title="按钮组" className="button-group card-wrap">
          <ButtonGroup>
            <Button type="primary">
              <Icon type="left" />
              返回
            </Button>
            <Button type="primary">
              前进
              <Icon type="right" />
            </Button>
          </ButtonGroup>
        </Card>
        <Card title="按钮尺寸" className="card-wrap">
          <RadioGroup onChange={this.onChange} value={this.state.size}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.size}>
            Lxx
          </Button>
          <Button size={this.state.size}>Lxx</Button>
          <Button type="dashed" size={this.state.size}>
            Lxx
          </Button>
          <Button type="danger" size={this.state.size}>
            Lxx
          </Button>
          <Button type="disabled" size={this.state.size}>
            Lxx
          </Button>
        </Card>
      </div>
    );
  }
}
