import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import member from './member'
import contents from './contents'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
Vue.use(axios)
export default new Vuex.Store({
  modules: {
    member,
    contents
  },
  plugins: [createPersistedState()]
})
