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
    signUp(context, payload) {
      context.commit('setMyInfo', payload)
    },
    logIn(context, payload) {
        context.commit('setMyInfo', payload)
    },
    logOut(context) {
        context.commit('setMyInfo', null)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}