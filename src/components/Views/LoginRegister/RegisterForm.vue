<template>
    <div>
      <p class="title">REJESTRACJA</p>
      <form @submit.prevent="register">
        <div class="input-group">
          <input
            class="input"
            type="text"
            id="first_name"
            placeholder="imię"
            v-model="firstName"
            required
          />
          <input
            class="input"
            type="text"
            id="last_name"
            placeholder="nazwisko"
            v-model="lastName"
            required
          />
        </div>
        <div class="input-group">
          <input
            class="input"
            type="text"
            id="email"
            placeholder="e-mail"
            v-model="email"
            required
          />
        </div>
        <div class="input-group password-group">
          <input
            class="input password-input"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="hasło (minimum 8 znaków)"
            v-model="password"
            required
          />
          <button
            class="password-toggle"
            @click="togglePasswordVisibility"
            type="button"
          >
            <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
          </button>
        </div>
        <div class="buttons-group">
          <button class="button" type="submit">ZAREJESTRUJ</button>
          <button class="button" type="button" @click="switchToLogin">
            ANULUJ
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import apiService from '@/apiService';
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword: false,
      };
    },
    methods: {
      async register() {
        try {
          await apiService.post('/register', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
          });
  
          Swal.fire({
            title: 'Sukces!',
            text: 'Rejestracja przebiegła pomyślnie.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.switchToLogin();
          });
        } catch (error) {
          Swal.fire({
            title: 'Błąd!',
            text: 'Wystąpił problem z rejestracją. Spróbuj ponownie.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      switchToLogin() {
        this.$emit('switch-form');
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
    },
  };
  </script>  

<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: 30px;
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
}

.input-group {
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
}

.password-group {
    position: relative;
}

.password-input {
    padding-right: 50px;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: $white;
}

.buttons-group {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}

.button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.button:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.input {
    color: $white;
    font-size: 22px;
    width: 100%;
    padding: 10px;
    padding-right: 50px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 15px;
    flex: 1;
}

.input:hover,
.input:focus {
    border: 2px solid $primary-color;
}
</style>