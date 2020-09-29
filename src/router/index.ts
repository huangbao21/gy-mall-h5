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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
