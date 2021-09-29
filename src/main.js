import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import $ from './utils/jquery-3.6.0.min.js'
Vue.prototype.$ = $;
import {setCookie, getCookie, checkCookie, clearCookie} from '@/utils/cookie';

Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$checkCookie = checkCookie;
Vue.prototype.$clearCookie = clearCookie;



Vue.prototype.baseUrl = 'http://localhost:8181'
Vue.prototype.headImgUrl = Vue.prototype.baseUrl+'/uploadImg/head/'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
