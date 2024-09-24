<template>
  <div class="messages-container">
    <div class="messages-select">
      <button class="for-someone" @click="fetchMessages('private')">Dla ciebie</button>
      <button class="for-someone" @click="fetchMessages('global')">Dla wszystkich</button>
    </div>
    
    <div class="new-message" @click="openModal">
      <img class="pencil-img" src="@/assets/images/Pencil.svg" alt="pencil">
      <p class="new-message-button">Napisz wiadomość</p>
    </div>

    <transition @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
      <message-modal :isVisible="isModalVisible" @close="closeModal" />
    </transition>

    <div class="messages-list">
      <div v-for="(message, index) in messages" :key="message.id" class="message-item" @click="toggleMessage(index)">
        <div class="message-details">
            <p class="sender-email">{{ message.sender_email }}</p>
            <p class="sender-title">{{ message.title }}</p>
            <p class="sender-date">Wysłane: {{ formatDate(message.sent_at) }}</p>
        </div>
        <div class="message-content">
            <p v-if="message.showMessage" class="sender-message">Treść: <br>{{ message.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/apiService';
import MessageModal from './MessageModal.vue';

export default {
  components: {
    MessageModal,
  },
  data() {
    return {
      messages: [],
      isModalVisible: false, // State to control modal visibility
    };
  },
  methods: {
    async fetchMessages(type) {
      const url = type === 'private' ? '/messages' : '/global-messages';
      try {
        const response = await apiService.get(`http://localhost:8000${url}`);
        this.messages = response.data.map(message => ({
          ...message,
          showMessage: false
        }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    toggleMessage(index) {
      this.messages[index].showMessage = !this.messages[index].showMessage;
    },
    formatDate(dateString) {
      const formattedDate = dateString.replace(' ', 'T');
      const date = new Date(formattedDate);
      return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
    },
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    beforeEnterOverlay(el) {
        el.style.opacity = 0;
    },
    enterOverlay(el, done) {
        el.offsetHeight;
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = 1;
        done();
    },
    leaveOverlay(el, done) {
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = 0;
        setTimeout(() => {
            this.closingModal = false;
            done();
        }, 300);
    },
  }
};
</script>
  
  <style lang="scss">
  .messages-container {
    width: 100%;
  }
  .messages-select {
    margin-left: -10px;
    margin-bottom: 15px;
  }
  
  .for-someone {
    background-color: transparent;
    border: 0px transparent;
    border-bottom: 4px solid transparent;
    height: 100px;
    width: 120px;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
  
  .for-someone:focus,
  .for-someone:hover {
    background-color: $messages-color;
    border-bottom: 4px solid $secondary-color;
  }
  
  .new-message {
    display: flex;
    flex-direction: row;
    background-color: $messages-color;
    padding: 15px;
    border-radius: 15px;
    gap: 10px;
    max-width: 150px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  
  .new-message:hover {
    background-color: $secondary-color;
  }
  
  .pencil-img {
    margin-left: 10px;
    height: 18px;
  }
  
  .new-message-button {
    font-family: 'Roboto-Light', sans-serif;
    background-color: transparent;
    border: none;
    color: $title-light-font;
    font-size: 12px;
    margin: 0;
  }
  
  .messages-list {
    margin-top: 20px;
    width: 100%;
  }
  
  .message-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: transparent;
    border-radius: 8px;
    border: 3px solid $messages-color;
    margin-bottom: 15px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
  }

  .message-details {
    display: flex;
    flex-direction: row;
  }
  
  .sender-email {
    font-weight: bold;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    flex-grow: 1;
  }
  .sender-title {
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    flex-grow: 1;
  }

  .message-content {
    width: 100%;
  }
  
  .sender-message {
    height: auto;
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    overflow-wrap: break-word;
    word-wrap: break-word;
    overflow: hidden;
    white-space: normal;
    max-width: 100%;
    hyphens: auto;
    word-break: break-word;
  }
  
  .sender-date {
    flex-grow: 1;
    text-align: right;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
  }
  
  @media (max-width: 1000px) {
    .message-item {
      display: flex;
      flex-direction: column;
    }
    .message-details {
        flex-direction: column;
    }
    .sender-date {
      text-align: left;
    }
  }
  </style>
  