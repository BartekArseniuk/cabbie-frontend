<template>
    <div class="news-page">
      <p class="title">AKTUALNOŚCI</p>
  
      <transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="blog-list" :key="currentPage">
          <BlogPreview
            v-for="(blog, index) in paginatedBlogs"
            :key="index"
            :date="blog.date"
            :title="blog.title"
            :imageBase64="blog.image_base64"
          />
        </div>
      </transition>
  
      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1" :style="{ color: currentPage === 1 ? '$placeholder-color' : '$primary-color' }">
          <i class="fas fa-chevron-left"></i>
        </button>
  
        <div class="pagination-dots">
          <span
            v-for="page in totalPages"
            :key="page"
            :class="['dot', { active: currentPage === page }]"
            @click="goToPage(page)"
          ></span>
        </div>
  
        <button @click="nextPage" :disabled="currentPage === totalPages" :style="{ color: currentPage === totalPages ? '$placeholder-color' : '$primary-color' }">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
  
      <button class="admin-button" v-if="getRole === 'admin'" @click="openManageBlog">
        <i class="fas fa-cog"></i> ZARZĄDZAJ
      </button>
  
      <transition name="modal" @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
        <div v-if="showManageBlog" class="modal-backdrop" @click.self="closeManageBlog">
          <transition name="modal-content" @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
            <div class="modal">
              <ManageBlog @close="closeManageBlog" @update-blogs="fetchBlogs" />
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import ManageBlog from "./ManageBlog.vue";
  import BlogPreview from "./BlogPreview.vue";
  
  export default {
    components: {
      ManageBlog,
      BlogPreview,
    },
    data() {
      return {
        showManageBlog: false,
        currentPage: 1,
        blogsPerPage: 3,
        direction: 'next',
      };
    },
    computed: {
      ...mapGetters(["getRole", "getBlogs"]),
      paginatedBlogs() {
        const start = (this.currentPage - 1) * this.blogsPerPage;
        const end = start + this.blogsPerPage;
        return this.getBlogs.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.getBlogs.length / this.blogsPerPage);
      },
    },
    methods: {
      ...mapActions(["fetchBlogs"]),
      prevPage() {
        if (this.currentPage > 1) {
          this.direction = 'prev';
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.direction = 'next';
          this.currentPage++;
        }
      },
      updateBlogsPerPage() {
        const width = window.innerWidth;
        if (width < 768) {
          this.blogsPerPage = 1;
        } else {
          this.blogsPerPage = 3;
        }
        this.currentPage = 1;
      },
      goToPage(page) {
        this.currentPage = page;
      },
      openManageBlog() {
        this.showManageBlog = true;
        window.addEventListener("keydown", this.handleKeydown);
      },
      closeManageBlog() {
        this.showManageBlog = false;
        window.removeEventListener("keydown", this.handleKeydown);
        this.fetchBlogs();
      },
      handleKeydown(event) {
        if (event.key === "Escape") {
          this.closeManageBlog();
        }
      },
      beforeEnter(el) {
        el.style.transform = this.direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        el.style.opacity = 0;
      },
      enter(el, done) {
        el.offsetHeight; // trigger reflow
        el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        el.style.transform = 'translateX(0)';
        el.style.opacity = 1;
        done();
      },
      leave(el, done) {
        el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        el.style.transform = this.direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        el.style.opacity = 0;
        setTimeout(done, 500);
      },
      beforeEnterOverlay(el) {
        el.style.opacity = 0;
        el.style.visibility = 'visible'; // Zapewnij, że tło jest widoczne od razu
      },
      enterOverlay(el, done) {
        el.offsetHeight; // trigger reflow
        el.style.transition = "opacity 0.3s ease";
        el.style.opacity = 1;
        done();
      },
      leaveOverlay(el, done) {
        el.style.transition = "opacity 0.3s ease";
        el.style.opacity = 0;
        setTimeout(done, 300);
      },
      beforeEnterModal(el) {
        el.style.transform = 'scale(0.7)';
        el.style.opacity = 0;
      },
      enterModal(el, done) {
        el.offsetHeight; // trigger reflow
        el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        el.style.transform = 'scale(1)';
        el.style.opacity = 1;
        done();
      },
      leaveModal(el, done) {
        el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        el.style.transform = 'scale(0.7)';
        el.style.opacity = 0;
        setTimeout(done, 300);
      },
    },
    mounted() {
      this.fetchBlogs();
      this.$store.dispatch("getUserRole");
      window.addEventListener("resize", this.updateBlogsPerPage);
      this.updateBlogsPerPage();
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.updateBlogsPerPage);
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .news-page {
    background-image: url('@/assets/images/Group 26-placeholder.png');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    transition: background-image 0.5s ease-in-out;
    height: 110vh;
  }
  
  .title {
    text-align: center;
    font-size: 42px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
  }
  
  .blog-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 800px;
    height: auto;
    justify-content: center;
    gap: 30px;
    position: absolute;
    margin-top: 130px;
  
    @media (max-width: 768px) {
      flex-direction: column; // Zmiana kierunku na kolumnę dla małych ekranów
      width: 100%; // Zmieniamy szerokość na 100% dla mobilnych
      margin-top: 20px; // Dostosowanie marginesu dla mobilnych
      gap: 15px; // Zmniejszenie odstępu między blogami
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 320px;
  
    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      font-size: 20px;
      color: $primary-color;
  
      &:disabled {
        color: $placeholder-color;
        cursor: not-allowed;
      }
    }
  }
  
  .pagination-dots {
    display: flex;
    align-items: center;
    margin: 0 20px;
  
    .dot {
      height: 10px;
      width: 10px;
      margin: 0 5px;
      background-color: $placeholder-color;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
  
      &.active {
        background-color: $primary-color;
      }
    }
  }
  
  .admin-button {
    font-size: 18px;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    font-weight: 800;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background: none;
    text-transform: uppercase;
    transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .admin-button:hover {
    color: $primary-color;
  }
  
  .modal-backdrop {
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
  
  .modal {
    background: $secondary-color;
    padding: 20px;
    border-radius: 20px;
    min-width: 300px;
    opacity: 1;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .news-page {
      height: 100vh;
    }
  
    .modal {
      width: 90%;
      max-width: 400px;
      padding: 15px;
    }
  
    .title {
      margin-top: 100px;
    }
  
    .blog-list {
      margin-top: 200px;
    }
  
    .pagination {
      margin-top: 350px; 
    }
  }
  </style>
  