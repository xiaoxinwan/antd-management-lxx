import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, { param: "callback" }, function(err, response) {
        if (response.status === "success") {
          resolve(response);
        } else {
          reject(response.message);
        }
      });
    });
  }
  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById("ajaxLoading");
      loading.style.display = "block";
    }

    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        baseURL: "https://www.easy-mock.com/mock/5ccc623e9e5cbc7d96b2981c/mock",
        url: options.url,
        timeout: 5000,
        params: (options.data && options.data.params) || ""
      }).then(res => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById("ajaxLoading");
          loading.style.display = "none";
        }
        if (res.status === 200) {
          if (res.data.code === 0) {
            resolve(res.data);
          } else {
            Modal.error({
              title: "提示",
              content: res.data.message
            });
          }
        } else {
          reject(res.data);
        }
      });
    });
  }
}
