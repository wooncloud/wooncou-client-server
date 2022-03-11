import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// bootstrap-vue 등록
import Bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
// axios
import axios from 'axios'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import '@/assets/css/styles.css'
import '@/assets/css/main.css'

Vue.use(Bootstrap)
Vue.prototype.$axios = axios
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
