import { createRouter, createWebHashHistory } from 'vue-router'
import { Dialog } from 'vant'
import Home from '../views/home/Home'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mycart',
    name: 'MyCart',
    component: () => import('../views/my-cart/MyCart.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../views/personal/Personal'),
    beforeEnter (to, from, next) {
      if (sessionStorage.isLogin) {
        next()
      } else {
        setTimeout(() => {
          Dialog({ message: '请您先登录再进行操作' })
          next('/login')
        }, 500)
      }
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/detail/Detail')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/Order')
  },
  {
    path: '/my_order_list',
    name: 'MyOrderList',
    component: () => import('../views/my-order-list/MyOrderList'),
    beforeEnter (to, from, next) {
      if (sessionStorage.isLogin) {
        next()
      } else {
        setTimeout(() => {
          Dialog({ message: '请您先登录再进行操作' })
          next('/login')
        }, 500)
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
