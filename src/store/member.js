const state = {
  myInfo: null
}

const getters = {
  getMyInfo: function (state) {
    return state.myInfo
  }
}

const mutations = {
  setMyInfo (state, payload) {
    state.myInfo = payload
  }
}

const actions = {
  logIn ({ commit }, payload) {
    commit('setMyInfo', payload)
  },
  logOut ({ commit }) {
    axios.get('/member/logout')
      .then(() => {
        commit('setMyInfo', null)
      })
      .catch(() => {
        commit('setMyInfo', null)
      })
  },
  nicknameAction ({ commit }, payload) {
    axios.post('/member/nickname')
      .then((response) => {
        alert(response.data + '님 로그인 되었습니다.')
        this.$Vue.set(this.$store.state.member.myInfo, 'nickname', response.data)
      }).catch(() => {

      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
