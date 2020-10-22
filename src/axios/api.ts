const NATIVE_BASE_URL = 'gycn://m.gy.cn/';
const APP_SERVICE = process.env.VUE_APP_H5_API + 'h5-api/';
export default class API {
  static TO_BACK_APP = `${NATIVE_BASE_URL}toBackApp`;

  // 赚钱中心
  static MISSION_LIST = `${APP_SERVICE}authc/mission/find_page`
  static BOUNTY_NUM = `${APP_SERVICE}authc/mission/find_bounty_number`
  static BOUNTY_LIST = `${APP_SERVICE}authc/mission/find_page_bounty_number`
  static MISSION_SAVE = `${APP_SERVICE}authc/mission/save`

  // 商品类目
  static CATEGORY_LIST = `${APP_SERVICE}authc/category/find_all`;
  static GOODS_SAVE=`${APP_SERVICE}authc/product/save`;

  // 上传文件
  static UPLOAD_FILE=`${APP_SERVICE}upload`
  static BOUNTY_RANK = `${APP_SERVICE}authc/mission/find_bounty_and_rank`
  static UPDATE_TRANSFER = `${APP_SERVICE}authc/mission/update_transfer`

  // 企业认证
  static DISCERN_QUQLIFICATION = `${APP_SERVICE}authc/qualification/discern_license`
  // 保存资质信息
  static KEEP_QUQLIFICATION = `${APP_SERVICE}/authc/qualification/save`
}
