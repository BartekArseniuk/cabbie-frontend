<template>
    <div class="profile-container">
      <aside class="sidebar" :class="{ 'hidden': isMobile }">
        <button>DANE I DOKUMENTY</button>
        <button :class="{ 'disabled': !isEmailVerified }">WIADOMOŚCI</button>
        <button :class="{ 'disabled': !isEmailVerified }">PORTFEL</button>
        <button :class="{ 'disabled': !isEmailVerified }">FAKTURY</button>
        <button :class="{ 'disabled': !isEmailVerified }">USTAWIENIA ROZLICZEŃ</button>
        <button :class="{ 'disabled': !isEmailVerified }">RYCZAŁT</button>
      </aside>
  
      <div v-if="isMobile" class="mobile-menu">
        <button class="toggle-sidebar-btn" :class="{ 'collapsed': !isSidebarOpen, 'expanded': isSidebarOpen }" @click="toggleSidebar">
          <i :class="isSidebarOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </button>
        <div class="mobile-menu-content" :class="{ 'open': isSidebarOpen }">
          <button>DANE I DOKUMENTY</button>
          <button :class="{ 'disabled': !isEmailVerified }">WIADOMOŚCI</button>
          <button :class="{ 'disabled': !isEmailVerified }">PORTFEL</button>
          <button :class="{ 'disabled': !isEmailVerified }">FAKTURY</button>
          <button :class="{ 'disabled': !isEmailVerified }">USTAWIENIA ROZLICZEŃ</button>
          <button :class="{ 'disabled': !isEmailVerified }">RYCZAŁT</button>
        </div>
        <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div> <!-- Nakładka -->
      </div>
  
      <div class="driver-details-container">
        <DriverDetails />
      </div>
    </div>
  </template>
  
  <script>
  import DriverDetails from './DriverDetails.vue';
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    components: {
      DriverDetails
    },
    data() {
      return {
        isSidebarOpen: false,
        isMobile: window.innerWidth <= 768,
        isEmailVerified: false
      };
    },
    computed: {
      ...mapGetters(['getUser']),
      user() {
        return this.getUser || {};
      }
    },
    methods: {
      ...mapActions(['fetchUser', 'updateUser']),
      toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 768;
        if (!this.isMobile) {
          this.isSidebarOpen = false;
        }
      },
      handleClickOutside(event) {
        const menu = this.$el.querySelector('.mobile-menu');
        if (menu && !menu.contains(event.target) && this.isSidebarOpen) {
          this.isSidebarOpen = false;
        }
      }
    },
    async mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      document.addEventListener('mousedown', this.handleClickOutside);
      await this.fetchUser(); // Fetch user data
      this.isEmailVerified = !!this.user.email_verified_at; // Set email verified status
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  };
  </script>
  
  <style lang="scss">
  .profile-container {
    display: flex;
    height: auto;
    position: relative;
  }
  
  .sidebar {
    width: 200px;
    background-color: $secondary-color;
    padding: 20px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-in-out;
    position: relative;
    z-index: 0;
  }
  
  .sidebar.hidden {
    display: none;
  }
  
  .sidebar button {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 16px;
    white-space: nowrap;
    border-radius: 15px;
    font-family: 'Roboto-Light', 'sans-serif';
    background-color: transparent;
    color: $title-light-font;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .sidebar button.disabled {
    color: $placeholder-color;
    cursor: not-allowed;
  }
  
  .sidebar button:hover:not(.disabled) {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .toggle-sidebar-btn {
    background-color: $secondary-color;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: $title-light-font;
    padding: 10px;
    border-radius: 20px;
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
    z-index: 3;
  }
  
  .toggle-sidebar-btn.collapsed {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  .toggle-sidebar-btn.expanded {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  .mobile-menu-content {
    display: flex;
    flex-direction: column;
    background-color: $secondary-color;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%) scaleY(0);
    transform-origin: top;
    width: 80%;
    z-index: 3;
    transition: transform 0.4s ease, opacity 0.4s ease;
    opacity: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    align-items: center;
  }
  
  .mobile-menu-content.open {
    transform: translateX(-50%) scaleY(1);
    opacity: 1;
  }
  
  .mobile-menu-content button {
    width: 100%;
    margin: 10px 0;
    padding: 15px;
    font-size: 16px;
    font-family: 'Roboto-Light', 'sans-serif';
    background-color: transparent;
    color: $title-light-font;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .mobile-menu-content button.disabled {
    color: $placeholder-color;
    cursor: not-allowed;
  }
  
  .mobile-menu-content button:hover:not(.disabled) {
    font-weight: 700;
    transform: scale(1.02);
  }
  
  @media (min-width: 769px) {
    .mobile-menu {
      display: none;
    }
  }
  
  .driver-details-container {
    margin-left: 100px;
    margin-right: 20px;
  }
  
  @media (max-width: 768px) {
    .driver-details-container {
      margin-left: auto;
      margin-right: auto;
      width: 90%;
      margin-top: 100px;
    }
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 2;
    display: none;
  }
  
  .mobile-menu .overlay {
    display: block;
  }
  </style>  