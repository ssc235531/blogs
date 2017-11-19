// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/store.js"

//数据获取，发送
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios,axios)

//引入element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
