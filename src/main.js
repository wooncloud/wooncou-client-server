import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// bootstrap-vue 등록
import Bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
// axios
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URI;

// Quill
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// XSS filter
import sanitizeHtml from 'sanitize-html'

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import toast from './plugins/toast';

// Infinite Loading
import InfiniteLoading from 'vue-infinite-loading';

import '@/assets/css/styles.css'
import '@/assets/css/main.css'

Vue.use(Bootstrap)
Vue.prototype.$axios = axios
Vue.prototype.$sanitize = sanitizeHtml
Vue.use(VueQuillEditor)
Vue.use(VueSweetalert2)
Vue.use(InfiniteLoading);
Vue.use(toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
