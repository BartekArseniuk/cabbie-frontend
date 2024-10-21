import { createStore } from 'vuex';
import apiService from './apiService';
import Swal from 'sweetalert2';
import CryptoJS from 'crypto-js';

const encryptionKey = 'F8DSNF3HLR39UFSJF98D';

const encrypt = (data) => CryptoJS.AES.encrypt(data, encryptionKey).toString();
const decrypt = (ciphertext) => CryptoJS.AES.decrypt(ciphertext, encryptionKey).toString(CryptoJS.enc.Utf8);

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('T94&hgK%'),
    user: null,
    userId: null,
    userRole: null,
    firstLogin: true,
    isLoggedIn: false,
    isUserEmailVerified: false,
    hasUnreadMessages: false,
    isFormVerified: false,
    users: [],
    blogs: [],
    reviews: [],
    messages: [],
    userSurveyData: {},
    sections: [],
    questions: [],
  },

  mutations: {
    SET_AUTHENTICATED(state, status) {
      state.isAuthenticated = status;
    },

    SET_LOGGED_IN(state, status) {
      state.isLoggedIn = status;
    },

    setUser(state, userData) {
      state.user = userData;
    },

    SET_USERS(state, users) {
      state.users = users;
    },

    setUserId(state, id) {
      state.userId = id;
      const encryptedUserId = encrypt(id.toString());
      localStorage.setItem('U&58hf*p', encryptedUserId);
    },

    setFirstLogin(state, status) {
      state.firstLogin = status;
    },

    setUserRole(state, role) {
      state.userRole = role;
      const encryptedUserRole = encrypt(role);
      localStorage.setItem('R&4jH4@', encryptedUserRole);
    },

    setBlogs(state, blogs) {
      state.blogs = blogs;
    },

    setIsEmailVerified(state, isEmailVerified) {
      state.isUserEmailVerified = isEmailVerified;
    },

    setReviews(state, reviews) {
      state.reviews = reviews;
    },

    setMessages(state, messages) {
      state.messages = messages;
    },

    MARK_MESSAGE_AS_READ(state, messageId) {
      const message = state.messages.find(msg => msg.id === messageId);
      if (message) {
        message.read = true;
      }
    },

    SET_HAS_UNREAD_MESSAGES(state, status) {
      state.hasUnreadMessages = status;
    },

    SET_FORM_VERIFIED(state, isVerified) {
      state.isFormVerified = isVerified;
    },

    SET_USER_SURVEY_DATA(state, payload) {
      state.userSurveyData = payload;
    },

    SET_SECTIONS(state, sections) {
      state.sections = sections;
    },

    SET_QUESTIONS(state, questions) {
      state.questions = questions;
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
          const { data } = error.response;
          if (data.errors && data.errors.email) {
            if (data.errors.email.includes('The email has already been taken.')) {
              throw new Error('E-mail jest już zajęty.');
            }
            if (data.errors.email.includes('The email field must be a valid email address.')) {
              throw new Error('Niepoprawny format adresu E-mail.');
            }
          }
          if (data.errors && data.errors.password) {
            throw new Error('Hasło nie spełnia wymagań.');
          }
        }
        throw new Error('Błąd rejestracji.');
      }
    },

    async login({ commit, dispatch }, { email, password }) {
      try {
        const response = await apiService.post('/login', { email, password });
        const { token, userId, role } = response.data;

        const encryptedToken = encrypt(token);
        localStorage.setItem('T94&hgK%', encryptedToken);
        commit('SET_AUTHENTICATED', true);
        commit('setUserId', userId);
        commit('setUserRole', role);
        await dispatch('fetchFirstLoginStatus');
        await dispatch('getUserRole');
        await dispatch('fetchUser');

        await apiService.get('/test-session');
      } catch (error) {
        dispatch('logout');
        throw new Error('Login failed');
      }
    },

    async checkLoginStatus({ commit }) {
      try {
        const response = await apiService.get('/user-status');
        if (response.data.authenticated) {
          commit('SET_AUTHENTICATED', true);
          commit('setUser', response.data.user);
        } else {
          commit('SET_AUTHENTICATED', false);
          commit('setUser', null);
        }
      } catch (error) {
        commit('SET_AUTHENTICATED', false);
        commit('setUser', null);
      }
    },

    async isLogged({ commit, dispatch }) {
      try {
        const response = await apiService.get('/api/check-session');
        if (response.data.logged_in) {
          commit('SET_LOGGED_IN', true);
        } else {
          commit('SET_AUTHENTICATED', false);
          commit('setFirstLogin', null);
          commit('SET_LOGGED_IN', false);
          commit('setUserRole', null);
          localStorage.removeItem('T94&hgK%');
          localStorage.removeItem('U&58hf*p');
          localStorage.removeItem('R&4jH4@');

          Swal.fire({
            title: 'Sesja wygasła',
            text: 'Zostałeś wylogowany z powodu nieaktywności.',
            icon: 'warning',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = '/';
          });
        }
      } catch (error) {
        console.log('Error:', error);
        dispatch('logout');
      }
    },

    async logout({ commit }) {
      try {
        await apiService.post('/logout');
        commit('SET_AUTHENTICATED', false);
        commit('setFirstLogin', null);
        commit('SET_LOGGED_IN', false);
        commit('setUserRole', null);
        localStorage.removeItem('T94&hgK%');
        localStorage.removeItem('U&58hf*p');
        localStorage.removeItem('R&4jH4@');
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

    async fetchUsers({ commit }) {
      try {
        const response = await apiService.get('/users');
        const filteredUsers = response.data.filter(user => user.id !== 1);
        commit('SET_USERS', filteredUsers);
        return filteredUsers;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Unable to fetch users');
      }
    },

    async fetchUser({ commit }) {
      try {
        const encryptedUserId = localStorage.getItem('U&58hf*p');
        const userId = decrypt(encryptedUserId);
        const response = await apiService.get(`users/${userId}`);
        commit('setUser', response.data);
        commit('SET_FORM_VERIFIED', response.data.is_form_verified);
        if (response.data.email_verified_at != null) {
          commit('setIsEmailVerified', true);
        } else {
          commit('setIsEmailVerified', false);
        }

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },

    async fetchUserById({ commit }, userId) {
      try {
        const response = await apiService.get(`users/${userId}`);
        commit('setUser', response.data);
        commit('setIsEmailVerified', response.data.email_verified_at != null);
        commit('SET_FORM_VERIFIED', response.data.is_form_verified);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      }
    },

    async updateUser({ dispatch }, user) {
      try {
        const encryptedUserId = localStorage.getItem('U&58hf*p');
        const userId = decrypt(encryptedUserId);
        await apiService.put(`users/${userId}`, user);
        await dispatch('fetchUser');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },

    async resendVerificationEmail() {
      try {
        const encryptedUserId = localStorage.getItem('U&58hf*p');
        const userId = decrypt(encryptedUserId);
        const response = await apiService.post(`/resend-verification/${userId}`);
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
    },

    async getUserRole({ commit }) {
      try {
        const encryptedUserRole = localStorage.getItem('R&4jH4@');
        if (encryptedUserRole) {
          const decryptedRole = decrypt(encryptedUserRole);
          commit('setUserRole', decryptedRole);
        } else {
          console.error('Role not found in localStorage');
        }
      } catch (error) {
        console.error('Error decrypting role:', error);
      }
    },

    async fetchBlogs({ commit }) {
      const response = await apiService.get('blogs');
      commit('setBlogs', response.data);
    },

    async addBlog({ dispatch }, blog) {
      await apiService.post('blogs', blog);
      await dispatch('fetchBlogs');
    },

    async updateBlog({ dispatch }, updatedPost) {
      await apiService.put(`blogs/${updatedPost.id}`, updatedPost);
      await dispatch('fetchBlogs');
    },

    async deleteBlog({ dispatch }, id) {
      await apiService.delete(`blogs/${id}`);
      await dispatch('fetchBlogs');
    },

    async fetchReviews({ commit }) {
      try {
        const response = await apiService.get(`/reviews/ChIJI7_8IzvHkwgRjBdfCt_u4cg`);
        commit('setReviews', response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    },

    async sendMessage(_, { isGlobal, receiver, title, message }) {
      const endpoint = isGlobal ? "/global-messages/send" : "/messages/send";
      return await apiService.post(endpoint, {
        receiver_email: isGlobal ? null : receiver,
        title,
        message,
      });
    },

    async fetchMessages({ commit }, type) {
      const url = type === 'private' ? '/messages' : '/global-messages';
      try {
        const response = await apiService.get(url);
        const messages = response.data.map((message) => ({
          ...message,
          sender_email: type === 'global' ? 'Cabbie' : message.sender_email,
          showMessage: false,
          read: message.is_read || false,
        }));
        commit('setMessages', messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },

    async markMessageAsRead({ commit }, { messageId, type }) {
      const url = type === 'private'
        ? `/private-messages/${messageId}/read`
        : `/global-messages/${messageId}/read`;

      try {
        await apiService.put(url);
        commit('MARK_MESSAGE_AS_READ', messageId);
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    },

    async checkIsThereAnyMessages({ commit }) {
      try {
        const globalMessagesResponse = await apiService.get('/global-messages/has-unread');
        const hasUnreadGlobalMessages = globalMessagesResponse.data.hasUnreadMessages;

        const privateMessagesResponse = await apiService.get('/private-messages/has-unread');
        const hasUnreadPrivateMessages = privateMessagesResponse.data.hasUnreadMessages;

        const hasUnread = hasUnreadGlobalMessages || hasUnreadPrivateMessages;

        commit('SET_HAS_UNREAD_MESSAGES', hasUnread);
      } catch (error) {
        console.error('Error checking unread messages:', error);
        commit('SET_HAS_UNREAD_MESSAGES', false);
      }
    },

    async updateFormVerificationStatus({ commit }, { userId, isVerified }) {
      try {
        await apiService.put(`/users/${userId}/verify-form`, {
          is_form_verified: isVerified,
        });
        commit('SET_FORM_VERIFIED', isVerified);
      } catch (error) {
        console.error('Error updating verification status:', error);
        throw new Error('Nie udało się zaktualizować statusu weryfikacji formularza.');
      }
    },

    async fetchUserSurveyData({ commit }, { userId }) {
      commit('SET_USER_SURVEY_DATA', null);

      try {
        const response = await apiService.get(`/survey/user/${userId}`);
        const data = response.data;

        const selectedData = {
          isDriver: data.isDriver,
          carType: data.carType,
          taxiRegistry: data.taxiRegistry,
          jobStatus: data.jobStatus,
          startTime: data.startTime,
          weeklyHours: data.weeklyHours,
          foundVia: data.foundVia,
        };

        if (data.isDriver != null) {
          commit('SET_USER_SURVEY_DATA', selectedData);
        } else {
          commit('SET_USER_SURVEY_DATA', null);
        }

      } catch (error) {
        console.error("Failed to fetch user survey data:", error);
      }
    },

    async fetchSections({ commit }) {
      try {
        const response = await apiService.get('/sections');
        commit('SET_SECTIONS', response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    },

    async addSection({ dispatch }, sectionData) {
      try {
        await apiService.post('/sections', { title: sectionData.title });
        await dispatch('fetchSections');
      } catch (error) {
        console.error('Error adding section:', error);
      }
    },


    async updateSection({ dispatch }, { sectionId, updatedData }) {
      try {
        await apiService.put(`/sections/${sectionId}`, updatedData);
        await dispatch('fetchSections');
      } catch (error) {
        console.error('Error updating section:', error);
      }
    },

    async deleteSection({ dispatch }, sectionId) {
      try {
        await apiService.delete(`/sections/${sectionId}`);
        await dispatch('fetchSections');
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    },

    async fetchQuestions({ commit }) {
      try {
        const response = await apiService.get('/questions');
        commit('SET_QUESTIONS', response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },

    async addQuestion({ dispatch }, questionData) {
      try {
        await apiService.post('/questions', questionData);
        await dispatch('fetchSections');
        await dispatch('fetchQuestions');
      } catch (error) {
        console.error('Error adding question:', error);
      }
    },

    async updateQuestion({ dispatch }, { questionId, updatedData }) {
      try {
        await apiService.put(`/questions/${questionId}`, updatedData);
        await dispatch('fetchSections');
        await dispatch('fetchQuestions');
      } catch (error) {
        console.error('Error updating question:', error);
      }
    },

    async deleteQuestion({ dispatch }, questionId) {
      try {
        await apiService.delete(`/questions/${questionId}`);
        await dispatch('fetchSections');
        await dispatch('fetchQuestions');
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    },

    async sendContactEmail(_, { first_name, last_name, email, message }) {
      try {
        const response = await apiService.post('/send-email', {
          first_name,
          last_name,
          email,
          message
        });
        Swal.fire({
          title: 'Sukces',
          text: 'Wiadomość została wysłana pomyślnie.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        return response.data;
      } catch (error) {
        Swal.fire({
          title: 'Błąd',
          text: 'Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        throw new Error('Błąd wysyłania wiadomości');
      }
    },    
  },

  getters: {
    isAuthenticated: state => state.isAuthenticated,
    getUser: state => state.user,
    getUsers: (state) => state.users,
    getRole: state => state.userRole,
    getFirstLogin: state => state.firstLogin,
    getBlogs: state => state.blogs,
    isEmailVerified: state => state.isUserEmailVerified,
    getReviews: (state) => state.reviews,
    getMessages: (state) => state.messages,
    isFormVerified: state => state.isFormVerified,
    getSections: state => state.sections,
    getQuestions: state => state.questions,
    hasUnreadMessages: (state) => {
      return state.hasUnreadMessages;
    },
    getUserSurveyData: (state) => state.userSurveyData,
  },
});