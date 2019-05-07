import React from "react";
import { Modal, message } from "antd";

let Utils = {
  ui: {
    // 封装modal.info
    alert(options) {
      const callback = options.callback;
      options = Object.assign(
        {},
        {
          title: "温馨提示",
          icon: "exclamation-circle",
          width: 320,
          content: <div>{options.text}</div>,
          okText: "关闭"
        },
        options
      );
      const info = Modal.info(options);
    },
    // 封装confirm
    confirm(options) {
      options = Object.assign(
        {},
        {
          title: "",
          width: 320,
          content: (
            <div style={{ textAlign: "center" }}>
              {options.text}
              {options.desc ? <p>{options.desc}</p> : ""}
            </div>
          ),
          okText: "确定"
        },
        options
      );
      Modal.confirm(options);
    }
  },
  fixNum(num) {
    return num < 10 ? `0${num}` : num.toString();
  },
  // 格式化日期 （2019-05-06 23:12:33）
  formatDate(time) {
    if (!time) return;
    let date = new Date(time);
    return (
      [
        date.getFullYear(),
        Utils.fixNum(date.getMonth() + 1),
        Utils.fixNum(date.getDate())
      ].join("-") +
      " " +
      [
        Utils.fixNum(date.getHours()),
        Utils.fixNum(date.getMinutes()),
        Utils.fixNum(date.getSeconds())
      ].join(":")
    );
  },
  // 格式化时间（1小时5分30秒）
  formatTime(time) {
    if (!time) {
      return "";
    }
    return (
      parseInt(time / 60 / 60) +
      "小时" +
      parseInt((time / 60) % 60) +
      "分钟" +
      parseInt((time % 60) % 60) +
      "秒"
    );
  },
  // 格式化金额  （430分 =  4.30元）
  formatFee(fee, suffix = "") {
    if (!fee) {
      return 0;
    }
    if (typeof suffix !== "string") {
      suffix = "";
    }
    fee = Math.floor(fee) / 100;
    var s = fee.toString();
    var rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + 2) {
      s += "0";
    }
    return s + suffix;
  },
  // 格式化公里数 （3000 = 3公里）
  formatMileage(mileage, text) {
    if (!mileage) {
      return 0;
    }
    if (mileage >= 1000) {
      text = text || "km";
      return Math.floor(mileage / 100) / 10 + text;
    } else {
      text = text || "m";
      return mileage + text;
    }
  },
  // 分页器
  pagination(data, callback) {
    return {
      current: data.result.page,
      pagesize: data.result.page_size,
      total: data.result.total,
      showQuickJumper: true,
      onChange: current => {
        callback(current);
      },
      showTotal: () => {
        return `共${data.result.total}页`;
      }
    };
  },
  goToOrderDetail(orderId){
    if(!orderId){ return message.info('请选中一项数据')}
    let url = `/#/common/order/detail/${orderId}`
    window.open(url, '_blank')
  }
}; 

export default Utils;
