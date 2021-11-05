import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Moment from 'moment'
import './plugins/element.js'

import {setCookie, getCookie, checkCookie, clearCookie} from '@/utils/cookie';
//cookie方法
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$checkCookie = checkCookie;
Vue.prototype.$clearCookie = clearCookie;

// 定义全局时间戳过滤器
Vue.filter('dateFormat', function (value) {
    return Moment(value).format('YYYY-MM-DD HH:mm:ss')
})

import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
//后端链接
Vue.prototype.baseUrl = 'http://localhost:8181'
//后端头像图片链接
Vue.prototype.headImgUrl = Vue.prototype.baseUrl + '/uploadImg/head/'
//后端乐器图片链接
Vue.prototype.insImgUrl = Vue.prototype.baseUrl + '/uploadImg/ins/'
//后端乐器类型图片链接
Vue.prototype.insTypeImgUrl = Vue.prototype.baseUrl + '/uploadImg/insType/'
//后端默认图片名（乐器、视频、视频类型、乐器类型）
Vue.prototype.defaultImgName='occupancy.jpg'
//eventbus
Vue.prototype.$bus = new Vue()

//导入moment（格式化日期）
import moment from "moment/moment";
Vue.prototype.moment=moment

//引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts=echarts


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
