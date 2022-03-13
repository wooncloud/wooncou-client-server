import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// bootstrap-vue 등록
import Bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
// axios
import axios from 'axios'
// toast
import toastr from "toastr/build/toastr.min.js"
import "toastr/build/toastr.css"

// Quill
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import '@/assets/css/styles.css'
import '@/assets/css/main.css'

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "100",
  "hideDuration": "100",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

Vue.use(Bootstrap)
Vue.prototype.$axios = axios
Vue.prototype.$toast = toastr
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
