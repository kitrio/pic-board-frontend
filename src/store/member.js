const state = {
    myInfo: null
}

const getters = { 
        getMyInfo: function(state) {
            return state.myInfo
        }
    }

const mutations = {
    setMyInfo(state, payload){
        state.myInfo = payload;
    },
}

const actions = {
    logIn({ commit }, payload) {
        commit('setMyInfo', payload)
    },
    logOut({ commit }) {
        commit('setMyInfo', null)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}