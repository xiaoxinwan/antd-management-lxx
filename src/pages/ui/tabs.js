import React from "react";
import { Card, Tabs, message, Icon } from "antd";
import "./ui.less";

const TabPane = Tabs.TabPane;
export default class XTabs extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {
        title: "Tab 1",
        content: "Content of Tab 1",
        key: "1"
      },
      {
        title: "Tab 2",
        content: "Content of Tab 2",
        key: "2"
      },
      {
        title: "Tab 3",
        content: "Content of Tab 3",
        key: "3",
        closable: false
      }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes
    };
  }
  handleTabClick = key => {
    message.info(`你选择的是标签：${key}`);
  };
  handleTabChange = activeKey => {
    this.setState({ activeKey });
  };
  handleTabEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };
  remove = targetKey => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, index) => {
      if (pane.key === targetKey) {
        lastIndex = index - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  render() {
    return (
      <div>
        <Card title="Tab标签页" className="card-wrap">
          <Tabs
            defaultActiveKey="1"
            onTabClick={key => this.handleTabClick(key)}
          >
            <TabPane tab="Tab 1" key="1">
              愉快地玩耍吧
            </TabPane>
            <TabPane tab="Tab 2" key="2" disabled>
              愉快地玩耍吧
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              尽情地享乐吧
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图标标签页" className="card-wrap">
          <Tabs
            defaultActiveKey="1"
            onTabClick={key => this.handleTabClick(key)}
          >
            <TabPane
              tab={
                <span>
                  <Icon type="frown" />
                  Tab 1
                </span>
              }
              key="1"
            >
              愉快地玩耍吧
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="meh" />
                  Tab 2
                </span>
              }
              key="2"
            >
              愉快地玩耍吧
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="smile" />
                  Tab 3
                </span>
              }
              key="3"
            >
              尽情地享乐吧
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab可关闭卡片式标签页" className="card-wrap">
          <Tabs
            onChange={this.handleTabChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.handleTabEdit}
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                {pane.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    );
  }
}
