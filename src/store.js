import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('authToken')
  },
  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    }
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem('authToken', token);
      commit('SET_AUTHENTICATED', true);
    },
    logout({ commit }) {
      localStorage.removeItem('authToken');
      commit('SET_AUTHENTICATED', false);
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  }
});