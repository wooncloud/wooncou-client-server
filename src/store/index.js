import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, // 로딩화면
    constants: {
      regex: {
        email : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,}$/i,
      }
    },
    
  },
  getters: {
    REGEX_EMAIL: state => { return state.constants.regex.email },
  },
  mutations: {
    // $store.commit('onLoading');
    onLoading(state) {
      state.isLoading = true;
    },
    // $store.commit('offLoading');
    offLoading(state) {
      state.isLoading = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
