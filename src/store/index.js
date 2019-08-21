import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import member from './member'
import content from './content'
Vue.use(Vuex)
Vue.use(axios)
export default new Vuex.Store({
  modules: {
    member,
    content
  }
})
