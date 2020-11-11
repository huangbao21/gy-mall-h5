import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '工作台' }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/earnMoneyCenter',
    name: 'EarnMoneyCenter',
    component: () => import(/* webpackChunkName: "earn" */ '../views/earn/EarnMoneyCenter.vue'),
    meta: { title: '赚钱中心' }
  },
  {
    path: '/earnMoneyDetail',
    name: 'EarnMoneyDetail',
    component: () => import(/* webpackChunkName: "earn" */ '../views/earn/EarnMoneyDetail.vue'),
    meta: { title: '已赚明细' }
  },
  {

    path: '/withdrawGold',
    name: 'WithdrawGold',
    component: () => import(/* webpackChunkName: "earn" */ '../views/earn/WithdrawGold.vue'),
    meta: { title: '金币提现' }
  },
  {
    path: '/systemManagement',
    name: 'SystemManagement',
    component: () => import(/* webpackChunkName: "system" */ '../views/system/SystemManagement.vue'),
    meta: { title: '体系管理' }
  },
  {
    path: '/certifiCation',
    name: 'CertifiCation',
    component: () => import(/* webpackChunkName: "enterprise" */ '../views/enterprise/CertifiCation.vue'),
    meta: { title: '企业认证' }
  },
  {
    path: '/submitAudit',
    name: 'SubmitAudit',
    component: () => import(/* webpackChunkName: "enterprise" */ '../views/enterprise/SubmitAudit.vue'),
    meta: { title: '提交审核' }
  },
  {
    path: '/goodsAdd',
    name: 'GoodsAdd',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsAdd.vue'),
    meta: { title: '新增商品' }
  },
  {
    path: '/goodsShow',
    name: 'GoodsShow',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsShow.vue'),
    meta: { title: '商品详情页' }
  },
  {
    path: '/customergoodsShow',
    name: 'CustomergoodsShow',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/CustomerGoodsShow.vue'),
    meta: { title: '商品详情页' }
  },
  {
    path: '/agentGoodsShow',
    name: 'AgentGoodsShow',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/AgentGoodsShow.vue'),
    meta: { title: '商品详情页' }
  },
  {
    path: '/goodsCategory',
    name: 'GoodsCategory',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsCategory.vue'),
    meta: { title: '商品类目' }
  },
  {
    path: '/goodsSKU',
    name: 'GoodsSKU',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsSKU.vue'),
    meta: { title: '价格库存' }

  },
  {
    path: '/commissionSetting',
    name: 'CommissionSetting',
    component: () => import('../views/reseller/CommissionSetting.vue'),
    meta: { title: '新增权益' }
  },
  {
    path: '/resellerManagement',
    name: 'ResellerManagement',
    component: () => import('../views/reseller/ResellerManagement.vue'),
    meta: { title: '分销商管理' }
  },
  {
    path: '/resellerAudit',
    name: 'ResellerAudit',
    component: () => import('../views/reseller/ResellerAudit.vue'),
    meta: { title: '分销商管理-申请列表' }
  },
  {
    path: '/goodsManage',
    name: 'GoodsManage',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsManage.vue'),
    meta: { title: '商品管理' }

  },
  {
    path: '/goodsChoose',
    name: 'GoodsChoose',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsChoose.vue'),
    meta: { title: '挑选商品' }

  },
  {
    path: '/agentGoodsManage',
    name: 'AgentGoodsManage',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/AgentGoodsManage.vue'),
    meta: { title: '代理商商品管理' }

  },
  {
    path: '/placeOrder',
    name: 'PlaceOrder',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/PlaceOrder.vue'),
    meta: { title: '确认订单' }
  },
  {
    path: '/payOrder',
    name: 'PayOrder',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/PayOrder.vue'),
    meta: { title: '订单支付' }
  },
  {
    path: '/enterpriseOrder',
    name: 'EnterpriseOrder',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/EnterpriseOrder.vue'),
    meta: { title: '企业主订单管理' }
  },
  {
    path: '/agentOrder',
    name: 'AgentOrder',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/AgentOrder.vue'),
    meta: { title: '代理商订单管理' }
  },
  {
    path: '/customerOrder',
    name: 'CustomerOrder',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/CustomerOrder.vue'),
    meta: { title: '客户订单管理' }
  },
  {
    path: '/enterpriseOrderView',
    name: 'EnterpriseOrderView',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/EnterpriseOrderView.vue'),
    meta: { title: '企业主订单详情' }
  },
  {
    path: '/agentOrderView',
    name: 'AgentOrderView',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/AgentOrderView.vue'),
    meta: { title: '代理商订单详情' }
  },
  {
    path: '/customerOrderView',
    name: 'CustomerOrderView',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/CustomerOrderView.vue'),
    meta: { title: '客户订单详情' }
  },
  {
    path: '/deliverPage',
    name: 'DeliverPage',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/DeliverPage.vue'),
    meta: { title: '发货' }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/system/Goods.vue'),
    meta: { title: '选择商品' }
  },
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import('../views/address/AddressEdit.vue'),
    meta: { title: '添加地址' }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/address/Address.vue'),
    meta: { title: '收货地址管理' }
  },
  {
    path: '/agentHome',
    name: 'AgentHome',
    component: () => import('../views/AgentHome.vue'),
    meta: { title: '工作台' }
  },
  {
    path: '/companyManage',
    name: 'CompanyManage',
    component: () => import('../views/company/CompanyManage.vue'),
    meta: { title: '企业主管理' }
  },
  {
    path: '/companyShop',
    name: 'CompanyShop',
    component: () => import('../views/company/CompanyShop.vue'),
    meta: { title: '商品橱窗' }
  },
  {
    path: '/applyTransition',
    name: 'ApplyTransition',
    component: () => import('../views/company/ApplyTransition.vue'),
    meta: { title: '申请过渡页' }
  },
  {
    path: '/internalManage',
    name: 'InternalManage',
    component: () => import('../views/internal/InternalManage.vue'),
    meta: { title: '内部管理' }
  },
  {
    path: '/jobSetting',
    name: 'JobSetting',
    component: () => import('../views/internal/JobSetting.vue'),
    meta: { title: '新增职位' }
  },
  {
    path: '/staffSetting',
    name: 'StaffSetting',
    component: () => import('../views/internal/StaffSetting.vue'),
    meta: { title: '新增员工' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
