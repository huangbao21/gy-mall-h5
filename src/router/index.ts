import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/earnMoneyCenter'
    // component: Home
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
    path: '/goodsManage',
    name: 'GoodsManage',
    component: () => import(/* webpackChunkName: "goods" */ '../views/goods/GoodsManage.vue'),
    meta: { title: '商品管理' }

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
