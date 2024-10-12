<template>
    <div class="second-section">
        <div class="text-container">
            <p class="description">
                <span class="highlight">Zautomatyzowany</span> system obliczający wynagrodzenia oraz podatki za Ciebie.
            </p>
            <p class="description">
                <span class="highlight">Brak prowizji</span> od zarobków Brutto.
            </p>
            <p class="description">
                Kampanie wspomagające <span class="highlight">rozwój</span> oraz <span class="highlight">oszczędność</span> poprzez długotrwałą współpracę.
            </p>
        </div>
    </div>
</template>

<script setup>
import {onMounted } from 'vue';

onMounted(() => {
    const image = new Image();
    image.src = new URL('@/assets/images/elegant-uber-driver-giving-taxi-ride.svg', import.meta.url).href;
    image.onload = () => {
        document.querySelector('.second-section').classList.add('loaded');
    };
});
</script>

<style lang="scss" scoped>
.second-section {
    background-image: url('@/assets/images/elegant-uber-driver-giving-taxi-ride-placeholder.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 50px;
    box-sizing: border-box;
    transition: background-image 0.5s ease-in-out;

    &.loaded {
        background-image: url('@/assets/images/elegant-uber-driver-giving-taxi-ride.svg');
    }
}

.text-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85vw;
    height: 50vh;
    background-image: linear-gradient(140deg, rgba(135, 135, 135, 0.1) 1%, rgba(135, 135, 135, 0.1) 100%);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    text-align: center;
    padding: 40px;
}

.text-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    padding: 1px;
    background: linear-gradient(to right, #C6C6C6, #727272);
    transform: scale(0.995);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
}

.description {
    font-size: 28px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
    text-align: center;
    width: 60%;
}

.highlight {
  color: $primary-color;
  font-weight: bold;
}

@media (max-width: 768px) {
    .second-section {
        height: auto;
        padding-right: 0;
    }

    .text-container {
        margin: 100px 20px 100px 20px;
        padding: 20px;
        height: auto;
        width: 100vw;
    }

    .title {
        font-size: 30px;
    }

    .description {
        font-size: 20px;
    }
}
</style>