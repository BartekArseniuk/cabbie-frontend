<template>
<div class="modal-backdrop" v-if="isVisible" @click.self="close">
    <div class="blog-details">
        <div class="header">
            <img :src="fullImage" alt="Blog Image" class="header-image" />
            <div class="blur-overlay"></div> <!-- Nowy efekt rozmycia -->
            <button class="close-button" @click="close">
                <i class="fas fa-times"></i>
            </button>
            <p class="title">{{ blog.title }}</p>
            <div class="author-info">
                <p class="author">Autor: {{ blog.author }}</p>
                <p class="date">Data: {{ formattedDate }}</p>
            </div>
        </div>
        <div class="content">
            <p>{{ blog.content }}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        blog: Object,
        isVisible: Boolean,
    },
    computed: {
        fullImage() {
            return `data:image/jpeg;base64,${this.blog.image_base64}`;
        },
        formattedDate() {
            const date = new Date(this.blog.updated_at);
            return date.toLocaleDateString();
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss" scoped>
.blog-details {
    width: 100%;
    max-width: 550px;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto-Light', sans-serif;
    overflow: hidden;
    margin: auto;
}

.header {
    position: relative;
    padding-top: 28%;
    z-index: 1;
}

.header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.blur-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(4px);
    z-index: 0;
}

.title {
    position: absolute;
    top: 10px;
    left: 20px;
    right: 20px;
    width: 70%;
    color: $primary-color;
    font-size: 20px;
    overflow-wrap: break-word;
    z-index: 1;
}

.author-info {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: $placeholder-color;
    font-size: 14px;
    z-index: 1;
}

.author,
.date {
    margin: 0;
    font-size: 0.85em;
}

.content {
    max-height: 320px;
    margin: 0;
    padding: 25px;
    background: rgba(71, 71, 71, 0.75);
    backdrop-filter: blur(2px);
    overflow-y: auto;
    color: $white;
    white-space: pre-wrap;
    font-size: 13px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: $scroll-track;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $primary-color;
    }
}

.close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: $primary-color;
    font-size: 22px;
    cursor: pointer;
    z-index: 1;
}

@media (max-width: 480px) {
    .blog-details {
        max-width: 90%;
    }

    .header {
        padding-top: 45%;
    }

    .title {
        font-size: 16px;
        left: 20px;
        right: 10px;
    }

    .author-info {
        font-size: 12px;
    }

    .content {
        font-size: 12px;
    }
}
</style>