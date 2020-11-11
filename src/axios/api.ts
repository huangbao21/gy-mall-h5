const NATIVE_BASE_URL = 'gycn://m.gy.cn/';
const APP_SERVICE = process.env.VUE_APP_H5_API + 'h5-api/';
export default class API {
  static TO_BACK_APP = `${NATIVE_BASE_URL}toBackApp`;
  static CALL_PAY_ORDER = `${NATIVE_BASE_URL}callPayOrder`

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
  static CUSTOMER_GOOD_DETAIL = `${APP_SERVICE}authc/product_customer/view`

  // 代理商商品管理
  static AGENT_GOODS_LIST = `${APP_SERVICE}authc/product_agency/find_page`
  static AGENT_GOODS_BATCH_ON_DOWN = `${APP_SERVICE}authc/product_agency/batch_on_or_down`
  static AGENT_GOODS_ON_DOWN = `${APP_SERVICE}authc/product_agency/all_on_or_down`
  static AGENT_GOOD_DEL = `${APP_SERVICE}authc/product_agency/delete`
  static AGENT_GOOD_DETAIL = `${APP_SERVICE}authc/product_agency/view`
  static AGENT_GOOD_SELECT = `${APP_SERVICE}authc/product_agency/select_product`
  static AGENT_STOCK_BATCH = `${APP_SERVICE}authc/product_agency/batch_stock_or_out`
  static SUPPLIER_LIST = `${APP_SERVICE}authc/agency_firm/find_supplier_page`

  // 订单管理
  static ORDER_SUPPLIER = `${APP_SERVICE}authc/order_supplier/find_page`
  static ORDER_VIEW = `${APP_SERVICE}authc/order_supplier/view`
  static order_deliver = `${APP_SERVICE}authc/order_supplier/deliver`

  // 代理商订单管理
  static ORDER_AGENT = `${APP_SERVICE}authc/order_agency/find_page`
  static AGENT_ORDER_VIEW = `${APP_SERVICE}authc/order_agency/view`

  // 客户订单管理
  static ORDER_CUSTOMER = `${APP_SERVICE}authc/order_customer/find_page`
  static CUSTOMER_ORDER_VIEW = `${APP_SERVICE}authc/order_customer/view`
  static CANCEL_ORDER = `${APP_SERVICE}authc/order_customer/cancel`
  static RECEIPT_ORDER = `${APP_SERVICE}authc/order_customer/receipt`
  static CREATE_ORDER = `${APP_SERVICE}authc/order_customer/save`

  // 上传文件
  static UPLOAD_FILE = `${APP_SERVICE}upload`

  // 营业执照识别
  static DISCERN_QUQLIFICATION = `${APP_SERVICE}authc/qualification/discern_license`
  // 保存资质信息
  static KEEP_QUQLIFICATION = `${APP_SERVICE}/authc/qualification/save`
  // 提交审核  查询资质信息
  static SUBMIT_AUDIT = `${APP_SERVICE}/authc/qualification/find_by_userId`
  // 修改资质信息
  static MODIFY_QUALIFICATION = `${APP_SERVICE}/authc/qualification/update`

  // 分销商管理
  static AGENCY_APPLY_LIST = `${APP_SERVICE}authc/agency_customer/find_agency_apply_page`
  static AUDIT_AGENCY_APPLY = `${APP_SERVICE}authc/agency_customer/audit_agency_apply`
  static SAVE_COMMISSION_SETTING = `${APP_SERVICE}authc/agency_customer/save_agency_sell_set`
  static COMMISSION_SETTING_LIST = `${APP_SERVICE}authc/agency_customer/find_agency_sell_set_list`
  static COMMISSION_LIMIT_AREA = `${APP_SERVICE}authc/agency_customer/find_agency_sell_set_limit`
  static QUERY_AGENCY_SALES = `${APP_SERVICE}authc/agency_customer/find_agency_sale`
  static APPLY_NUMBER = `${APP_SERVICE}authc/agency_customer/find_agency_apply_number`

  // 企业主管理
  static CAN_APPLY_COMPANY = `${APP_SERVICE}authc/agency_firm/find_agency_firm_page`
  static APPLIED_LIST = `${APP_SERVICE}authc/agency_firm/find_agency_apply_page`
  static COMPANY_GOODS_LIST_ONLINE = `${APP_SERVICE}authc/product_customer/find_page`
  static APPLY_AGENCY = `${APP_SERVICE}authc/customer/apply_agency`

  // 体系管理
  static QUERY_CONDITION_TYPE_LIST = `${APP_SERVICE}authc/agency_customer/find_condition_type_list`
  static SAVE_CONDITION = `${APP_SERVICE}authc/agency_customer/save_condition`
  static SAVE_RATIO = `${APP_SERVICE}authc/agency_customer/save_ratio`
  static QUERY_RATIO = `${APP_SERVICE}authc/agency_customer/find_ratio`
  static QUERY_CONDITION = `${APP_SERVICE}authc/agency_customer/find_condition`

  // 地址列表
  static ADDRESS_LIST = `${APP_SERVICE}authc/address/find_page`;
  static SAVE_ADDRESS = `${APP_SERVICE}authc/address/save`;
  static AREA_LIST = `${APP_SERVICE}authc/district/find_all`;
  static ADDRESS_INFO = `${APP_SERVICE}authc/address/view`;
  static DELETE_ADDRESS = `${APP_SERVICE}authc/address/delete`;
  static SET_ADDRESS_DEFAULT = `${APP_SERVICE}authc/address/set_default`;
  static DEFAULT_ADDRESS = `${APP_SERVICE}authc/address/find_default`;
  static EDIT_ADDRESS_INFO = `${APP_SERVICE}authc/address/update`;

  // 支付
  static ORDER_PAY_PARAM = `${APP_SERVICE}order_pay/pay_param`

  // 工作台
  static SALES_DATA = `${APP_SERVICE}authc/agency_customer/today_data`;
  static TRANSFER_MONEY = `${APP_SERVICE}authc/agency_customer/transfer`

  // 企业内部管理
  static STAFF_LIST = `${APP_SERVICE}authc/agency_customer/find_staff_customer_page`;
  static ADD_STAFF = `${APP_SERVICE}authc/agency_customer/save_staff_customer`
  static UPDATE_STAFF=`${APP_SERVICE}authc/agency_customer/update_customer_rank`
  static JOB_LIST = `${APP_SERVICE}authc/agency_customer/find_agency_rank`
  static UPDATE_JOB = `${APP_SERVICE}authc/agency_customer/update_customer_rank`
  static ADD_JOB = `${APP_SERVICE}authc/agency_customer/save_agency_rank`
}
