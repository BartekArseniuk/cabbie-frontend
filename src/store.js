import { createStore } from 'vuex';
import apiService from './apiService';

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('authToken'),
    user: null,
    userId: localStorage.getItem('userId') || null,
    firstLogin: true,
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
    setFirstLogin(state, status) {
      state.firstLogin = status;
    },
  },
  actions: {
    async register({ commit }, { first_name, last_name, email, password }) {
      try {
        const response = await apiService.post('/register', { first_name, last_name, email, password });
        commit('SET_AUTHENTICATED', false);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.errors && error.response.data.errors.email) {
            throw new Error('Email already taken');
          }
          if (error.response.data.errors && error.response.data.errors.password) {
            throw new Error('Incorrect password');
          }
        }
        throw new Error('Register failed');
      }
    },
    async login({ commit, dispatch }, { email, password }) { 
      try {
        const response = await apiService.post('/login', { email, password });
        const { token, userId } = response.data;

        localStorage.setItem('authToken', token);
        commit('SET_AUTHENTICATED', true);
        commit('setUserId', userId);
        await dispatch('fetchFirstLoginStatus'); 
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    async logout({ commit }) {
      try {
        await apiService.post('/logout');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        commit('SET_AUTHENTICATED', false);
        commit('setFirstLogin', null);
      } catch (error) {
        console.error('Logout failed', error);
      }
    },
    async fetchFirstLoginStatus({ commit }) {
      try {
        const response = await apiService.get('/first-login-status');
        commit('setFirstLogin', response.data.is_first_login);
      } catch (error) {
        console.error('Error fetching firstLogin status:', error);
      }
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
    async resendVerificationEmail({ state }) {
      try {
        const response = await apiService.post(`/resend-verification/${state.user.id}`);
        console.log('Verification email sent:', response.data);
      } catch (error) {
        console.error('Error resending verification email:', error);
      }
    },
    async forgotPassword(_, email) {
      try {
        const response = await apiService.post('/forgot-password', { email });
        return response.data;
      } catch (error) {
        console.error('Password reset failed:', error.response ? error.response.data : error.message);
        throw new Error('Password reset failed');
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
    getFirstLogin: state => state.firstLogin,
  },
});