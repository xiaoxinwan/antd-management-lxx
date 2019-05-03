import React from "react";
import { Card, Carousel } from "antd";
import "./ui.less";
export default class XCarousel extends React.Component {
  render() {
    return (
      <div>
        <Card title="文字背景轮播" className="card-wrap">
          <Carousel effect="fade" autoplay>
            <div>
              <h3>这是第一页</h3>
            </div>
            <div>
              <h3>这是第二页</h3>
            </div>
            <div>
              <h3>这是第三页</h3>
            </div>
            <div>
              <h3>这是第四页</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播">
          <Carousel effect='fade' autoplay>
            <img src="/carousel-img/carousel-1.jpg" alt="" />
            <img src="/carousel-img/carousel-2.jpg" alt="" />
            <img src="/carousel-img/carousel-3.jpg" alt="" />
          </Carousel>
        </Card>
      </div>
    );
  }
}
