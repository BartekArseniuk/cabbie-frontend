<template>
<div class="news-page">
    <p class="title">AKTUALNOŚCI</p>
    <div class="blog">
        <BlogPreview v-for="(blog, index) in blogs" :key="index" :date="blog.date" :title="blog.title" :imageBase64="blog.image_base64" />
    </div>
    <button class="admin-button" v-if="getRole === 'admin'" @click="openManageBlog">
        <i class="fas fa-cog"></i> ZARZĄDZAJ
    </button>

    <transition @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
        <div v-if="showManageBlog" class="modal-backdrop" @click.self="closeManageBlog">
            <transition @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
                <div class="modal">
                    <ManageBlog @close="closeManageBlog" @update-blogs="fetchBlogs" />
                </div>
            </transition>
        </div>
    </transition>
</div>
</template>

    
<script>
import {
    mapGetters
} from 'vuex';
import ManageBlog from './ManageBlog.vue';
import BlogPreview from './BlogPreview.vue';
import apiService from '@/apiService';

export default {
    components: {
        ManageBlog,
        BlogPreview
    },
    data() {
        return {
            showManageBlog: false,
            blogs: []
        };
    },
    computed: {
        ...mapGetters(['getRole'])
    },
    methods: {
        async fetchBlogs() {
            try {
                const response = await apiService.get('blogs');
                this.blogs = response.data;
            } catch (error) {
                console.error('Błąd podczas pobierania blogów:', error);
            }
        },
        openManageBlog() {
            this.showManageBlog = true;
            window.addEventListener('keydown', this.handleKeydown);
        },
        closeManageBlog() {
            this.showManageBlog = false;
            window.removeEventListener('keydown', this.handleKeydown);
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.closeManageBlog();
            }
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
            setTimeout(done, 300);
        },
        beforeEnterModal(el) {
            el.style.transform = 'translateY(-20px)';
            el.style.opacity = 0;
        },
        enterModal(el, done) {
            el.offsetHeight;
            el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            el.style.transform = 'translateY(0)';
            el.style.opacity = 1;
            done();
        },
        leaveModal(el, done) {
            el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            el.style.transform = 'translateY(-20px)';
            el.style.opacity = 0;
            setTimeout(done, 300);
        }
    },
    mounted() {
        this.fetchBlogs();
        this.$store.dispatch('getUserRole');
    }
};
</script>

<style lang="scss" scoped>
.news-page {
    background-image: url('@/assets/images/Group 26-placeholder.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    transition: background-image 0.5s ease-in-out;
}

.title {
    text-align: center;
    margin-top: 75px;
    font-size: 42px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
}

.blog {
    display: flex;
    overflow-x: auto;
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
    .modal {
        width: 90%;
        max-width: 400px;
        padding: 15px;
    }
}
</style>