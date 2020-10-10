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
const service = axios.create({
  headers: { 'content-Type': 'appliaction/json' },
  timeout: 6000
})
service.interceptors.request.use(
  config => {
    let splitUrl = [];
    let url = config.url;
    Toast.loading({ duration: 0, forbidClick: true });
    if (url) {
      let index = url.lastIndexOf('/');
      splitUrl.push(url.substring(0, index), url.substring(index + 1, url.length));
    }
    if (localStorage.token) {
      config.headers.common['Authorization'] = localStorage.token;
    }
    config.data = {
      action: splitUrl[1],
      object: { ...config.data }
    }
    config.url = splitUrl[0];
    return config
  },
  error => {
    return Promise.reject(error);
  }
)
service.interceptors.response.use(
  response => {
    const res: PostData = response.data
    if (res.status != StatusCode.SUCCESS) {
      if (res.msg) {
        Toast({ message: res.msg, forbidClick: true });
      }
      return Promise.reject(res);
    }
    Toast.clear();
    return response.data;
  },
  error => {
    Toast('网络超时，请刷新重试');
    return Promise.reject(error)
  }
)
export default service;