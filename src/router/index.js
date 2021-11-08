import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/UserLogin.vue'
import Main from '../views/Main.vue'
import UserInfo from '../views/UserInfo.vue'
import UserAdd from '../views/UserAdd.vue'
import UserModifyPwd from '../views/UserModifyPwd.vue'
import InsType from '../views/InsType.vue'
import GoodBuy from '../views/GoodBuy.vue'
import UserAddr from "@/views/UserAddr";


import UserUploadImg from '../views/UserUploadImg.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import OrderInfo from '../views/OrderInfo.vue'

import AdminLogin from '../views/AdminLogin.vue'

import adminindex from "@/router/adminindex";
import shopindex from "@/router/shopindex";


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
        path: '/InsType',
        name: 'InsType',
        component: InsType
    },
    {
        path: '/GoodBuy',
        name: 'GoodBuy',
        component: GoodBuy
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
    },
    {
        path: '/AdminLogin',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/UserAddr',
        name: 'UserAddr',
        component: UserAddr,
    },
    {
        path:'/OrderInfo',
        name: 'OrderInfo',
        component: OrderInfo,
    },
    ...adminindex,
    ...shopindex
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
