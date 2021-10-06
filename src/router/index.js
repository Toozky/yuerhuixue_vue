import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/UserLogin.vue'
import Main from '../views/Main.vue'
import UserInfo from '../views/UserInfo.vue'
import UserAdd from '../views/UserAdd.vue'
import UserModifyPwd from '../views/UserModifyPwd.vue'

import UserUploadImg from '../views/UserUploadImg.vue'
import ShoppingCart from '../views/ShoppingCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/UserAdd',
    name: 'UserAdd',
    component: UserAdd
  },
  {
    path: '/UserModifyPwd',
    name: 'UserModifyPwd',
    component: UserModifyPwd
  },
  {
    path: '/UserUploadImg',
    name: 'UserUploadImg',
    component: UserUploadImg
  },
  {
    path: '/ShoppingCart',
    name: 'ShoppingCart',
    component: ShoppingCart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
