import React from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./style/common.less";
import NavLeft from "./components/NavLeft";

export default class Admin extends React.Component {
  render() {
    return (
      <Row className="container">
        <Col className="nav-left" span={4}>
          <NavLeft />
        </Col>
        <Col className="main" span={20}>
          <Header />
          <Row className="content-container">这里边是有东西的</Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}
