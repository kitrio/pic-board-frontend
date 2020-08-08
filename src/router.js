import Vue from 'vue'

import Router from 'vue-router'
import BoardList from '@/views/board/BoardList'
import Contents from '@/views/board/Contents'
import Editor from '@/views/board/Editor'
import SearchList from '@/views/board/SearchList'
import Notfound from '@/views/NotFound'
import SignUp from '@/views/member/SignUp'
import Login from '@/views/member/Login'
import UserInfo from '@/views/member/UserInfo'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/service',
  routes: [
    {
      path: '/',
      name: 'BoardList',
      component: BoardList
    },
    {
      path: '/content/:num',
      name: 'Contents',
      component: Contents
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      meta: { authRequired: true }
    },
    {
      path: '*',
      name: 'Notfound',
      component: Notfound
    },
    {
      path: '/user/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/user/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/info/:nickname',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/search/:keyword',
      name: 'SearchList',
      component: SearchList
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    redirectLogin(to, from, next)
  } else {
    next()
  }
})

const redirectLogin = (to, from, next) => {
  if (store.getters['member/getMemberId'] === null) {
    alert('로그인이 필요합니다.')
    next('/user/login')
  } else {
    next()
  }
}

export default router
