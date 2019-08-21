import Vue from 'vue'
import Router from 'vue-router'
import BoardList from './components/board/BoardList'
import Editor from './components/board/Editor'
import Contents from './components/board/Contents'
import Notfound from './components/NotFound'
import SignUp from './components/member/SignUp'
import Login from './components/member/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/board',
  routes: [
    {
      path: '/board',
      name: 'BoardList',
      component: BoardList
    },
    { 
      path: '/board/:boardnum',
      name: 'Contents',
      component: Contents
    },
    {
      path: '/content/editor',
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
    }
  ]
})
