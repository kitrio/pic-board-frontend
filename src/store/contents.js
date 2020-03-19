const state = {
  content: null,
  imgPath: null
}

const getters = {
  getContent: function (state) {
    return state.content
  },
  getImg: function (state) {
    return state.imgPath
  }
}

const mutations = {
  setContent (state, payload) {
    state.content = payload
  },
  setImg (state, payload) {
    state.imgPath = payload
  }
}

const actions = {
  imgSubmit ({ commit }, payload) {
    axios({
      method: 'post',
      header: {
        'Content-Type': 'multipart/form'
      },
      url: '/list/content/write/image',
      processData: false,
      contentType: false,
      data: payload
    })
      .then(response => {
        if (response.status === 200) {
          commit('setImg', response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  contentAction ({ commit }, payload) {
    commit('setContent', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
