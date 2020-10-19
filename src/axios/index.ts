/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Toast } from 'vant';
export interface PostData {
  msg: string;
  status: string;
  data: any;
}
export class StatusCode {
  static SUCCESS = '000000';
  // static ERROR = 'E';
}
// axios.defaults.headers.post['Content-Type'] = 'appliaction/json';

const service = axios.create({
  timeout: 60000
})
service.interceptors.request.use(
  config => {
    const splitUrl = [];
    const url = config.url;
    Toast.loading({ duration: 0, forbidClick: true });
    if (url) {
      const index = url.lastIndexOf('/');
      splitUrl.push(url.substring(0, index), url.substring(index + 1, url.length));
    }
    if (localStorage.token) {
      // config.headers.common.Authorization = localStorage.token;
      config.headers.common.token = localStorage.token;
    } else {
      Toast('请先登录哦~')
    }
    return config
  },
  error => {
    return Promise.reject(error);
  }
)
service.interceptors.response.use(
  response => {
    const res: PostData = response.data
    if (res.status !== StatusCode.SUCCESS) {
      if (res.msg) {
        Toast.clear();
        Toast({ message: res.msg, forbidClick: true, duration: 2000 });
      }
      return Promise.reject(res);
    }
    Toast.clear();
    return response.data;
  },
  error => {
    Toast('网络异常，请稍后再试');
    return Promise.reject(error)
  }
)
export default service;
