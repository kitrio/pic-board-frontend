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
Vue.use(Router)

export default new Router({
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
      component: Editor
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
