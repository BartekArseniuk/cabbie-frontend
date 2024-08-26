<template>
<div class="news-page">
    <p class="title">AKTUALNOŚCI</p>
    <p class="opinion">Will be soon</p>
</div>
</template>

<style lang="scss" scoped>
.news-page {
    background-image: url('@/assets/images/Group 26.svg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
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