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
        Dialog({ message: '请您先登录再进行操作' })
        next('/login')
      }
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/detail/Detail')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
