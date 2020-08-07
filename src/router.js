import Vue from 'vue'

import Router from 'vue-router'
import BoardList from '@/components/board/BoardList'
import Contents from '@/components/board/Contents'
import Editor from '@/components/board/Editor'
import SearchList from '@/components/board/SearchList'
import Notfound from '@/components/NotFound'
import SignUp from '@/components/member/SignUp'
import Login from '@/components/member/Login'
import UserInfo from '@/components/member/UserInfo'
import store from './store/index'

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
