import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, // 로딩화면
  },
  getters: {
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
