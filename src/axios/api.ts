const NATIVE_BASE_URL = 'gycn://m.gy.cn/';
const APP_SERVICE = process.env.VUE_APP_H5_API + 'h5-api/';
export default class API {
  static TO_BACK_APP = `${NATIVE_BASE_URL}toBackApp`;

  // 赚钱中心
  static MISSION_LIST = `${APP_SERVICE}authc/mission/find_page`
  static BOUNTY_NUM = `${APP_SERVICE}authc/mission/find_bounty_number`
  static BOUNTY_LIST = `${APP_SERVICE}authc/mission/find_page_bounty_number`
  static MISSION_SAVE = `${APP_SERVICE}authc/mission/save`
  static BOUNTY_RANK = `${APP_SERVICE}authc/mission/find_bounty_and_rank`
  static UPDATE_TRANSFER = `${APP_SERVICE}authc/mission/update_transfer`

  // 商品类目
  static CATEGORY_LIST = `${APP_SERVICE}authc/category/find_all`;
  static GOODS_SAVE = `${APP_SERVICE}authc/product/save`;

  // 商品管理
  static GOODS_LIST = `${APP_SERVICE}authc/product/find_page_for_supplier`

  // 上传文件
  static UPLOAD_FILE = `${APP_SERVICE}upload`

  // 企业认证
  static DISCERN_QUQLIFICATION = `${APP_SERVICE}authc/qualification/discern_license`
  // 保存资质信息
  static KEEP_QUQLIFICATION = `${APP_SERVICE}/authc/qualification/save`

  // 分销商管理
  static AGENCY_APPLY_LIST=`${APP_SERVICE}authc/agency_customer/find_agency_apply_page`
  static AUDIT_AGENCY_APPLY=`${APP_SERVICE}authc/agency_customer/audit_agency_apply`
  static SAVE_COMMISSION_SETTING=`${APP_SERVICE}authc/agency_customer/save_agency_sell_set`
  static COMMISSION_SETTING_LIST=`${APP_SERVICE}authc/agency_customer/find_agency_sell_set_list`
  static COMMISSION_LIMIT_AREA=`${APP_SERVICE}authc/agency_customer/find_agency_sell_set_limit`
  static QUERY_AGENCY_SALES=`${APP_SERVICE}authc/agency_customer/find_agency_sale`

  // 体系管理
  static QUERY_CONDITION_TYPE_LIST=`${APP_SERVICE}authc/agency_customer/find_condition_type_list`
  static SAVE_CONDITION=`${APP_SERVICE}authc/agency_customer/save_condition`
  static SAVE_RATIO=`${APP_SERVICE}authc/agency_customer/save_ratio`
  static QUERY_RATIO=`${APP_SERVICE}authc/agency_customer/find_ratio`
  static QUERY_CONDITION=`${APP_SERVICE}authc/agency_customer/find_condition`
}
