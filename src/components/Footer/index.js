import React from "react";
import { Icon } from "antd";

import "./index.less";
export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        Copyright
        <Icon type="copyright" />
        <span className="text">2019 xiaoxinwan</span>
      </div>
    );
  }
}

