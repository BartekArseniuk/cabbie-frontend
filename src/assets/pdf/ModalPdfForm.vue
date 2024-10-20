<template>
  <transition @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">

    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </transition>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
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
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
  }
  .modal-content {
    padding: 20px;
    border-radius: 20px;
    width: 60%;
  }
  </style>
  