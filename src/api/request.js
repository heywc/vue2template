import service from "./http"; //
import qs from "qs"; // 引入qs模块，用来序列化post类型的数据

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params,
        ...config,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
        ...config,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function postitem(url, params, config) {
  params = params || {};
  return new Promise((resolve, reject) => {
    service
      .post(url, params, {
        transformRequest: [
          function (params) {
            params = qs.stringify(params);
            return params;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        ...config,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
