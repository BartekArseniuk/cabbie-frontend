<template>
    <div class="news-page">
        <p class="title">AKTUALNOŚCI</p>
        <p class="opinion">Will be soon</p>
    </div>
    </template>
    
    <script>
    export default {
        mounted() {
            const image = new Image();
            image.src = require('@/assets/images/Group 26.svg');
            image.onload = () => {
                this.$el.classList.add('loaded');
            };
        }
    }
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
    
        &.loaded {
            background-image: url('@/assets/images/Group 26.svg');
        }
    }
    
    .title {
        text-align: center;
        margin-top: 75px;
        font-size: 42px;
        font-family: 'Roboto-Light', sans-serif;
        color: $primary-color;
    }
    
    .opinion {
        font-size: 32px;
        color: white;
        font-family: 'Roboto-Light', sans-serif;
    }
    </style>