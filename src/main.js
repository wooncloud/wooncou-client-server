import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// bootstrap-vue 등록
import Bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
// axios
import axios from 'axios'

import '@/assets/css/styles.css'
import '@/assets/css/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


Vue.use(Bootstrap)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
