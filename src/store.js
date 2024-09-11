import { createStore } from 'vuex';
import apiService from './apiService';

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('authToken'),
    user: null,
    userId: localStorage.getItem('userId') || null,
  },
  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, userData) {
      state.user = userData;
    },
    setUserId(state, id) {
      state.userId = id;
      localStorage.setItem('userId', id);
    },
  },
  actions: {
    login({ commit }, { token, userId }) {
      localStorage.setItem('authToken', token);
      commit('SET_AUTHENTICATED', true);
      commit('setUserId', userId);
    },
    logout({ commit }) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      commit('SET_AUTHENTICATED', false);
    },
    async fetchUser({ commit, state }) {
      try {
        const response = await apiService.get(`users/${state.userId}`);
        commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser({ dispatch }, user) {
      try {
        await apiService.put(`users/${user.id}`, user);
        await dispatch('fetchUser');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
  },
});