<template>
<div class="modal-backdrop" v-if="isVisible" @click.self="close">
    <div class="blog-details">
        <div class="header">
            <img :src="fullImage" alt="Blog Image" class="header-image" />
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
            const date = new Date(this.blog.date);
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
    max-width: 600px;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto-Light', sans-serif;
    overflow: hidden;
    margin: auto;
}

.header {
    position: relative;
    padding-top: 30%;
    z-index: 1;
}

.header-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1);
    filter: blur(6px);
}

.title {
    position: absolute;
    top: 10px;
    left: 30px;
    right: 30px;
    width: 70%;
    color: $primary-color;
    font-size: 22px;
    overflow-wrap: break-word;
}

.author-info {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: $placeholder-color;
    font-size: 16px;
}

.author,
.date {
    margin: 0;
    font-size: 0.9em;
}

.content {
    max-height: 350px;
    margin: 0;
    padding: 30px;
    background: rgba(71, 71, 71, 0.75);
    backdrop-filter: blur(2px);
    overflow-y: auto;
    color: $white;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.8) rgba(71, 71, 71, 0.5);
    white-space: pre-wrap;
    font-size: 14px;
}

.content::-webkit-scrollbar {
    width: 10px;
}

.content::-webkit-scrollbar-track {
    background: rgba(71, 71, 71, 0.5);
    border-radius: 10px;
}

.content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
}

.content::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 1);
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: $primary-color;
    font-size: 24px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .header {
        padding-top: 40%;
    }

    .title {
        font-size: 20px;
        left: 10px;
        right: 10px;
    }

    .author-info {
        font-size: 14px;
        bottom: 20px;
    }
}

@media (max-width: 480px) {
    .blog-details {
        max-width: 90%;
    }

    .header {
        padding-top: 50%;
    }

    .title {
        font-size: 18px;
        left: 30px;
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