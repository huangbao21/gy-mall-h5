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
  static GOODS_UPDATE = `${APP_SERVICE}authc/product/update`;

  // 物流
  static QUERY_LOGISTICS = `${APP_SERVICE}authc/logistics/find_logistics`

  // 商品管理
  static GOODS_LIST = `${APP_SERVICE}authc/product/find_page_for_supplier`
  static GOODS_ON_DOWN = `${APP_SERVICE}authc/product/all_on_or_down`
  static GOODS_BATCH_ON_DOWN = `${APP_SERVICE}authc/product/batch_on_or_down`
  static GOOD_DEL = `${APP_SERVICE}authc/product/delete`
  static GOOD_DETAIL = `${APP_SERVICE}authc/product/view`

  // 代理商商品管理
  static AGENT_GOODS_LIST = `${APP_SERVICE}authc/product_agency/find_page`
  static AGENT_GOODS_BATCH_ON_DOWN = `${APP_SERVICE}authc/product_agency/batch_on_or_down`
  static AGENT_GOODS_ON_DOWN = `${APP_SERVICE}authc/product_agency/all_on_or_down`
  static AGENT_GOOD_DEL = `${APP_SERVICE}authc/product_agency/delete`
  static AGENT_STOCK_BATCH = `${APP_SERVICE}authc/product_agency/batch_stock_or_out`
  static SUPPLIER_LIST = `${APP_SERVICE}authc/agency_firm/find_supplier_page`

  // 订单管理
  static ORDER_SUPPLIER = `${APP_SERVICE}authc/order_supplier/find_page`
  static ORDER_VIEW = `${APP_SERVICE}authc/order_supplier/view`

  // 代理商订单管理
  static ORDER_AGENT = `${APP_SERVICE}authc/order_agency/find_page`
  static AGENT_ORDER_VIEW = `${APP_SERVICE}authc/order_agency/view`

  // 客户订单管理
  static ORDER_CUSTOMER = `${APP_SERVICE}authc/order_customer/find_page`
  static CUSTOMER_ORDER_VIEW = `${APP_SERVICE}authc/order_customer/view`

  // 上传文件
  static UPLOAD_FILE = `${APP_SERVICE}upload`

  // 企业认证
  static DISCERN_QUQLIFICATION = `${APP_SERVICE}authc/qualification/discern_license`
  // 保存资质信息
  static KEEP_QUQLIFICATION = `${APP_SERVICE}/authc/qualification/save`

  // 分销商管理
  static AGENCY_APPLY_LIST = `${APP_SERVICE}authc/agency_customer/find_agency_apply_page`
  static AUDIT_AGENCY_APPLY = `${APP_SERVICE}authc/agency_customer/audit_agency_apply`
  static SAVE_COMMISSION_SETTING = `${APP_SERVICE}authc/agency_customer/save_agency_sell_set`
  static COMMISSION_SETTING_LIST = `${APP_SERVICE}authc/agency_customer/find_agency_sell_set_list`
  static COMMISSION_LIMIT_AREA = `${APP_SERVICE}authc/agency_customer/find_agency_sell_set_limit`
  static QUERY_AGENCY_SALES = `${APP_SERVICE}authc/agency_customer/find_agency_sale`

  // 体系管理
  static QUERY_CONDITION_TYPE_LIST = `${APP_SERVICE}authc/agency_customer/find_condition_type_list`
  static SAVE_CONDITION = `${APP_SERVICE}authc/agency_customer/save_condition`
  static SAVE_RATIO = `${APP_SERVICE}authc/agency_customer/save_ratio`
  static QUERY_RATIO = `${APP_SERVICE}authc/agency_customer/find_ratio`
  static QUERY_CONDITION = `${APP_SERVICE}authc/agency_customer/find_condition`
}
