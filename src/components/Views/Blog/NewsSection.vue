<template>
<div class="news-page">
    <p class="title">AKTUALNOŚCI</p>

    <button v-if="!isMobile" class="control-button left" @click="prev" :disabled="currentSlide === 0">
        <i class="fas fa-chevron-left"></i>
    </button>

    <div class="carousel-wrapper">
        <div class="carousel">
            <div class="carousel-container" :style="carouselStyle">
                <div class="carousel-item" v-for="(blog, index) in infiniteBlogs" :key="index">
                    <BlogPreview :date="blog.date" :title="blog.title" :imageBase64="blog.image_base64" />
                </div>
            </div>
        </div>

        <div class="dot-navigation" v-if="!isMobile">
            <span class="dot" v-for="(dot, index) in totalSlides" :key="index" :class="{ active: index === currentSlide }" @click="goToSlide(index)"></span>
        </div>

        <div class="dot-navigation" v-if="isMobile">
            <span class="dot" v-for="(dot, index) in totalSlides" :key="index" :class="{ active: index === currentSlide }" @click="goToSlide(index)"></span>
        </div>
    </div>

    <button v-if="!isMobile" class="control-button right" @click="next" :disabled="currentSlide >= totalSlides - 1">
        <i class="fas fa-chevron-right"></i>
    </button>

    <div v-if="isMobile" class="mobile-navigation">
        <button class="mobile-button left" @click="prev" :disabled="currentSlide === 0">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="mobile-button right" @click="next" :disabled="currentSlide >= totalSlides - 1">
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>

    <button class="admin-button" v-if="getRole === 'admin'" @click="openManageBlog">
        <i class="fas fa-cog"></i> ZARZĄDZAJ
    </button>

    <transition name="modal" @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
        <div v-if="showManageBlog" class="modal-backdrop" @click.self="closeManageBlog">
            <transition name="modal" @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
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
            blogs: [],
            currentSlide: 0,
            itemsPerSlide: 3,
            isMobile: window.innerWidth < 768,
            infiniteBlogs: []
        };
    },
    computed: {
        ...mapGetters(['getRole']),
        totalSlides() {
            return Math.ceil(this.infiniteBlogs.length / this.itemsPerSlide);
        },
        carouselStyle() {
            const offset = -this.currentSlide * (100 / this.itemsPerSlide);
            return {
                transform: `translateX(${offset}%)`,
                transition: 'transform 0.5s ease'
            };
        }
    },
    methods: {
        async fetchBlogs() {
            try {
                const response = await apiService.get('blogs');
                this.blogs = response.data;

                this.infiniteBlogs = this.isMobile ? [...this.blogs] : [...this.blogs, ...this.blogs];
            } catch (error) {
                console.error('Błąd podczas pobierania blogów:', error);
            }
        },
        prev() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            } else {
                // Skok do końca w przypadku duplikacji
                this.currentSlide = this.totalSlides - 1;
            }
        },
        next() {
            if (this.currentSlide < this.totalSlides - 1) {
                this.currentSlide++;
            } else {
                this.currentSlide = 0;
            }
        },
        goToSlide(index) {
            this.currentSlide = index;
        },
        openManageBlog() {
            this.showManageBlog = true;
            window.addEventListener('keydown', this.handleKeydown);
        },
        closeManageBlog() {
            this.showManageBlog = false;
            window.removeEventListener('keydown', this.handleKeydown);
            this.fetchBlogs();
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.closeManageBlog();
            }
        },
        updateItemsPerSlide() {
            const previousIsMobile = this.isMobile;
            this.isMobile = window.innerWidth < 768;
            this.itemsPerSlide = this.isMobile ? 1 : 3;

            if (this.isMobile !== previousIsMobile) {
                this.currentSlide = 0;
                this.infiniteBlogs = this.isMobile ? [...this.blogs] : [...this.blogs, ...this.blogs];
            }
        }
    },
    mounted() {
        this.fetchBlogs();
        this.$store.dispatch('getUserRole');
        this.updateItemsPerSlide();
        window.addEventListener('resize', this.updateItemsPerSlide);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateItemsPerSlide);
    }
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

.carousel-wrapper {
    width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.carousel-container {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-item {
    min-width: calc(100% / 3);
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
}

.control-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: $primary-color;
    transition: color 0.3s;
    z-index: 2;

    &.left {
        left: 30px;
    }

    &.right {
        right: 30px;
    }

    &:hover {
        color: darken($primary-color, 10%);
    }

    &:disabled {
        color: gray;
        cursor: not-allowed;
    }
}

.dot-navigation {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    flex-wrap: wrap;

    .dot {
        height: 10px;
        width: 10px;
        margin: 0 5px;
        border-radius: 50%;
        background-color: lightgray;
        cursor: pointer;

        &.active {
            background-color: $primary-color;
        }

        &:hover {
            background-color: darken($primary-color, 10%);
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
    .carousel-item {
        min-width: 100%;
    }

    .modal {
        width: 90%;
        max-width: 400px;
        padding: 15px;
    }

    .title {
        margin-top: 100px;
    }

    .dot-navigation {
        margin-top: 25px;
    }

    .mobile-navigation {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .mobile-button {
        background: $primary-color;
        border: none;
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        font-size: 18px;
        cursor: pointer;
        margin: 0 10px;

        &:disabled {
            background: gray;
            cursor: not-allowed;
        }
    }
}
</style>