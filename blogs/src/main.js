// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//数据获取，发送
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios,axios)


//引入element ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)

Vue.config.productionTip = false


//富文本编辑
import '../static/Ueditor/ueditor.config.js'
import '../static/Ueditor/ueditor.all.min.js'
import '../static/Ueditor/lang/zh-cn/zh-cn.js'
import '../static/Ueditor/ueditor.parse.min.js'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
