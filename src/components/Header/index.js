import React from "react";
import { Row, Col } from "antd";
import "./index.less";
import Util from "../../utils/utils";
import axios from "../../axios";

export default class Header extends React.Component {
  state = {};
  componentWillMount() {
    this.setState({
      userName: "lxx"
    });
    setInterval(() => {
      let sysTime = Util.formatDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);
    this.getWeatherDateApi();
  }

  getWeatherDateApi() {
    let city = "江门";
    axios
      .jsonp({
        url:
          "http://api.map.baidu.com/telematics/v3/weather?location=" +
          encodeURIComponent(city) +
          "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
      })
      .then(res => {
        if (res.status === "success") {
          let data = res.results[0].weather_data[0];
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather
          });
        }
      });
  }
  render() {
    const menuType = this.props.menuType;

    return (
      <div className="header">
        <Row className="header-top">
          {menuType ? (
            <Col span={6} className="logo">
              <img src="/assets/logo-ant.svg" alt="" />
              <span>后台管理系统</span>
            </Col>
          ) : (
            ""
          )}
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出登录</a>
          </Col>
        </Row>
        {menuType ? (
          ""
        ) : (
          <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              首页
            </Col>
            <Col span={20} className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-symbol">
                <img src={this.state.dayPictureUrl} alt="" />
              </span>
              <span>{this.state.weather}</span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
