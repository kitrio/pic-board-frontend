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
        axios.post('/logout',{})
          .then(() =>{            
            commit('setMyInfo', null)
        })
        .catch((error) => {
            console.error(error)
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