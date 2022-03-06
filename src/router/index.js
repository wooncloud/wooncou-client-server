import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

// componenets
import HomeView from '../views/HomeView.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashBoard from '../views/admin/AdminDashBoard.vue'
import NotFound from '../components/error/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin
  },
  {
    path: '/',
    name: 'adminLogout',
    beforeEnter: async function (to, from, next) {
      axios.get('/api/users/logout')
        .then(res => {
          if (res.status === 200) {
            localStorage.removeItem('accessToken')
            next({ path: '/' })
          }
        }).catch((e) => {
          console.error(e)
          next({ path: '/' })
        })
    }
  },
  {
    path: '/admin/dashboard',
    name: 'admin',
    component: AdminDashBoard,
    beforeEnter: async function (to, from, next) {
      const token = localStorage.getItem('accessToken')
      axios.get('/api/users/auth')
        .then(res => {
          if (res.status === 200 && res.data._id === token) {
            next()
          } else {
            alertLogout()
            next({ path: '/admin/login' })
          }
        })
        .catch((e) => {
          console.log(e)
          next({ path: '/admin/login' })
        })
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: "notFound",
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function alertLogout () {
  alert('로그아웃 되었습니다. 로그인 하세요.')
}

export default router
