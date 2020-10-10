const NATIVE_BASE_URL = 'gycn://m.gy.cn/';
const APP_SERVICE = process.env.VUE_H5_API + 'h5-api/';
export default class API {
  static TO_BACK_APP = `${NATIVE_BASE_URL}toBackApp`;

  // 赚钱中心
  static MISSION_LIST = `${APP_SERVICE}authc/mission/find_page`
}
