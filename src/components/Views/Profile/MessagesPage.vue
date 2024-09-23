<template>
    <div class="messages-container">
      <div class="messages-select">
        <button class="for-someone">Dla ciebie</button>
        <button class="for-someone">Dla wszystkich</button>
      </div>
      
      <div class="new-message">
        <img class="pencil-img" src="@/assets/images/Pencil.svg" alt="pencil">
        <p class="new-message-button">Napisz wiadomość</p>
      </div>
  
      <div class="messages-list">
        <div v-for="message in messages" :key="message.id" class="message-item">
          <p class="sender-email">{{ message.sender_email }}</p>
          <p class="sender-title">{{ message.title }}</p>
          <p class="sender-message">{{ message.message }}</p>
          <p class="sender-date">Wysłane: {{ formatDate(message.sent_at) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from '@/apiService';

  export default {
    data() {
      return {
        messages: []
      };
    },
    mounted() {
      this.fetchMessages();
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await apiService.get('http://localhost:8000/messages');
          this.messages = response.data;
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      },
      formatDate(dateString) {
        const formattedDate = dateString.replace(' ', 'T');
        const date = new Date(formattedDate);
  
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
      }
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
    flex-direction: row;
    gap: 2%;
    padding: 10px;
    background-color: transparent;
    border-radius: 8px;
    border: 3px solid $messages-color;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  
  .sender-email {
    font-weight: bold;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
  }
  .sender-title {
      font-family: 'Roboto-Light', sans-serif;
      color: $white;
    }
  
  .sender-message {
      font-family: 'Roboto-Light', sans-serif;
      color: $white;
      flex-grow: 1;
  }
  
  .sender-date {
    text-align: right;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
  }

  @media (max-width: 768px) {
    .message-item {
        display: flex;
        flex-direction: column;
        gap: 0px;
    }
    .sender-date {
        text-align: left;
    }
  }
  </style>
  