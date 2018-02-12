// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import './assets/css/foot.css'
import cFooter from './components/Footer.vue'
import api from './fetch/api.js'
// import io from 'socket.io-client';
Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.component('cFooter',cFooter)
// Vue.component('api',api)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
