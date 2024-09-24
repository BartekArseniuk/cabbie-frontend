<template>
    <div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
      <div class="modal-content">
        <h2 class="title">NOWA WIADOMOŚĆ</h2>
        <input class="input" type="text" v-model="receiver" id="receiver" placeholder="Do: " />
        <input class="input" type="text" v-model="title" id="title" placeholder="Tytuł: " />
  
        <textarea v-model="message" id="message" placeholder="Treść: "></textarea>
  
        <button class="send-button" @click="sendMessage">Wyślij</button>
        <button class="close-modal-button" @click="closeModal">Anuluj</button>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from '@/apiService';
  import Swal from 'sweetalert2';

  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        receiver: '',
        title: '',
        message: '',
      };
    },
    methods: {
      async sendMessage() {
          try {
          await apiService.post('/messages/send', {
              receiver_id: this.receiver,
              title: this.title,
              message: this.message,
          });
          Swal.fire('Wiadomość wysłana!', 'Twoja wiadomość została pomyślnie wysłana.', 'success');
          this.closeModal();
          } catch (error) {
          console.error('Error sending message:', error);
          Swal.fire('Błąd!', 'Nie udało się wysłać wiadomości.', 'error');
          }
      },
      closeModal() {
          this.$emit('close');
          this.receiver = '';
          this.title = '';
          this.message = '';
      },
      handleKeyDown(event) {
        if (event.key === 'Escape') {
          this.closeModal();
        }
      },
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() { // Use `unmounted` in Vue 3
      window.removeEventListener('keydown', this.handleKeyDown);
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
    width: 60%;
    height: auto;
    background-color: $tertiary-color;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .title {
    text-align: center;
    font-size: 24px;
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
  }

  .input {
    color: $white;
    font-size: 18px;
    padding: 8px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 10px;
    margin-bottom: 10px;
    max-width: 100%;
  }

  .input:hover,
  .input:focus {
      border: 2px solid $primary-color;
  }

  textarea {
    color: $white;
    font-size: 18px;
    padding: 8px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 10px;
    margin-bottom: 10px;
    max-width: 100%;
    height: 150px;
    resize: none;
  }

  textarea:hover,
  textarea:focus {
      border: 2px solid $primary-color;
  }


  .send-button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    width: 150px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    margin: 0 auto;
    margin-bottom: 8px;
  }

  .close-modal-button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    width: 150px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    margin: 0 auto;
  }

  button:hover {
      color: $white;
      background-color: $primary-color;
      border: 2px solid $tertiary-color;
  }
  </style>
  