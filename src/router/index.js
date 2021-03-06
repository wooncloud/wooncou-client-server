import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

// componenets
import Home from '../views/Home.vue'
import PostList from '../views/PostList.vue'
import Report from '../views/Report.vue'
import Detail from '../views/Detail.vue'
import Goldbox from '../views/Goldbox.vue'
import Tags from '../views/Tags.vue'
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashBoard from '../views/admin/AdminDashBoard.vue'
import NotFound from '../components/error/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { // 홈페이지
    path: '/',
    name: 'home',
    component: Home,
  },
  { // 로그인
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin,
  },
  { // 로그아웃
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
  { // 어드민
    path: '/admin/dashboard',
    name: 'admin',
    component: AdminDashBoard,
    beforeEnter: async function (to, from, next) {
      checkToken(next)
    }
  },
  { // 문의
    path: '/report',
    name: 'report',
    component: Report,
  },
  { // 리스트
    path: '/posts/:tag*',
    name: 'posts',
    component: PostList,
  },
  { // 게시글
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
  { // 태그 목록
    path: '/tags',
    name: 'tags',
    component: Tags,
  },
  { // 골드박스
    path: '/goldbox',
    name: 'goldbox',
    component: Goldbox,
  },
  { // 404
    path: '/:pathMatch(.*)*',
    name: "notFound",
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 로그인 체크
function checkToken(next) {
  const token = localStorage.getItem('accessToken')
  axios.get('/api/users/auth', {withCredentials: true})
    .then(res => {
      if (res.status === 200 && res.data._id === token) {
        next()
      } else {
        alertLogout()
        next({ path: '/admin/login' })
      }
    })
    .catch((e) => {
      next({ path: '/admin/login' })
    })
}

function alertLogout () {
  alert('로그아웃 되었습니다. 로그인 하세요.')
}

export default router
