<template>
  <div :class="['lets-begin', { 'home-page': props.isHomePage, 'offer-page': !props.isHomePage }]">
    <p class="title">ZACZNIJMY WSPÓŁPRACĘ</p>
    <p class="instructions">
      Aby rozpocząć współpracę i uzyskać dostęp do wszystkich funkcji,
      proszę przejść do panelu nawigacyjnego i kliknąć opcję <strong>Logowanie</strong>.
      Jeśli jeszcze nie masz konta, będziesz mieć możliwość jego stworzenia.
      Czekamy na Ciebie!
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isHomePage: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.lets-begin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: background-image 0.3s ease, height 0.3s ease;
}

.home-page {
  background-image: url('@/assets/images/zacznijmy wspolprace zdj.svg');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.offer-page {
  background-image: none;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
  border-top: 1px solid $secondary-color;
  border-bottom: 1px solid $secondary-color;
}

.title {
  color: $title-light-font;
  font-family: 'Roboto-Light', 'sans-serif';
  font-size: 42px;
  text-align: center;
}

.instructions {
  font-family: 'Roboto-Light', 'sans-serif';
  font-size: 20px;
  padding-left: 50px;
  padding-right: 50px;
  max-width: 50%;
  color: $title-light-font;
  text-align: center;
}

.instructions strong {
  color: $primary-color;
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
    padding: 10px;
  }

  .instructions {
    font-size: 18px;
    max-width: 100%;
  }
}
</style>