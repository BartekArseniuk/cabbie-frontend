<template>
    <div v-if="!isAuthenticated" :class="['lets-begin', { 'home-page': props.isHomePage, 'offer-page': !props.isHomePage }]">
      <p class="title">ZACZNIJMY WSPÓŁPRACĘ</p>
      <button class="join" @click="openModal">DOŁĄCZ</button>
  
      <ModalForm :isVisible="isModalVisible" @close="closeModal" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { defineProps } from 'vue';
  import { useStore } from 'vuex';
  import ModalForm from '../Views/LoginRegister/ModalForm.vue';
  
  const props = defineProps({
    isHomePage: {
      type: Boolean,
      default: false,
    },
  });
  
  const store = useStore();
  const isAuthenticated = computed(() => store.getters.isAuthenticated);
  
  const isModalVisible = ref(false);
  
  const openModal = () => {
    isModalVisible.value = true;
  };
  
  const closeModal = () => {
    isModalVisible.value = false;
  };
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

.join {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 28px;
    padding: 20px 40px;
    transition: all 0.3s ease;
}

.join:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

@media (max-width: 768px) {
    .title {
        font-size: 32px;
        margin-top: 100px;
        padding: 10px;
    }
}
</style>