import axios from 'axios'
const state = {
  memberId: null,
  nickname: null
}

const getters = {
  getMemberId (state) {
    return state.memberId
  },
  getNickname (state) {
    return state.nickname
  }
}

const mutations = {
  setMemberId (state, payload) {
    state.memberId = payload
  },
  setNickname (state, payload) {
    state.nickname = payload
  }
}

const actions = {
  logIn ({ commit }, payload) {
    commit('setMemberId', payload)
  },
  logout ({ commit }) {
    axios.post('/member/logOut')
      .then(() => {
        commit('setMemberId', null)
      })
      .catch(() => {
        commit('setNickname', null)
      })
  },
  nicknameAction ({ commit }) {
    axios.post('/member/nickname')
      .then((response) => {
        alert(response.data + '님 로그인 되었습니다.')
        commit('setNickname', response.data)
      }).catch(() => {
        alert('서버에 접속 할수 없습니다.')
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
