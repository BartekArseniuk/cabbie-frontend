<template>
  <transition name="modal-overlay-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <transition name="modal-content-fade">
        <div class="modal-content">
          <p class="title">LOGOWANIE</p>
          <form @submit.prevent="login">
            <div class="email-form">
              <input class="input" type="text" id="email" placeholder="e-mail" v-model="email" required>
            </div>
            <div class="password-form">
              <input class="input" type="password" id="password" placeholder="hasło" v-model="password" required>
            </div>
            <div class="remind-password">
              <button class="remind-password-button" type="button">Nie pamiętam hasła</button>
            </div>
            <div class="buttons-group">
              <button class="button" type="submit">ZALOGUJ</button>
              <button class="button" type="button">ZAREJESTRUJ</button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'scale(1)';
    },
    enter(el, done) {
      el.offsetHeight;
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = 1;
      el.style.transform = 'scale(1)';
      done();
    },
    leave(el, done) {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = 0;
      el.style.transform = 'scale(0.5)';
      done();
    },
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
  align-items: start;
  z-index: 2;
}

.title {
  font-size: 30px;
  color: $primary-color;
  font-family: 'Roboto-Light', 'sans-serif';
}

.modal-content {
  margin-top: 100px;
  background-color: $tertiary-color;
  padding: 30px;
  border-radius: 30px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.email-form {
  margin-bottom: 10px;
}

.remind-password {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 10px;
}

.remind-password-button {
  cursor: pointer;
  color: $remind-password;
  font-family: 'Roboto-Light', 'sans-serif';
  font-size: 12px;
  background-color: transparent;
  border: none;
  transition: color 0.3s ease;
}

.remind-password-button:hover {
  color: $primary-color;
}

.input {
  font-size: 22px;
  padding: 10px;
  background-color: $secondary-color;
  outline: none;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  border-radius: 15px;
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

.input:hover,
.input:focus {
  border: 2px solid $primary-color;
}

.modal-overlay-fade-enter-active,
.modal-overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-overlay-fade-enter,
.modal-overlay-fade-leave-to {
  opacity: 0;
}

.modal-content-fade-enter-active,
.modal-content-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-content-fade-enter,
.modal-content-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
