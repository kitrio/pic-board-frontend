import Vue from 'vue'
import Vuex from 'vuex'
import member from './member'
import contents from './contents'
import createPersistedState from 'vuex-persistedstate'
import axios from '../plugins/axios'

Vue.use(Vuex)
Vue.use(axios)
export default new Vuex.Store({
  modules: {
    member,
    contents
  },
  plugins: [
    createPersistedState({
      paths: ['member']
    })
  ]
})
