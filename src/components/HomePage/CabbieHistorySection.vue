<template>
    <div :class="{ 'cabbie-history': true, loaded }">
        <div class="text-container">
            <p class="title">HISTORIA CABBIE</p>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const description = "Firma Cabbie z Białegostoku to Twój doświadczony partner w branży przewozowej. Jako byli kierowcy, doskonale rozumiemy potrzeby osób pracujących w tej profesji. Zbudowaliśmy nasze doświadczenie na własnej praktyce za kierownicą, co pozwala nam na oferowanie usług najwyższej jakości.";
const loaded = ref(false);

onMounted(() => {
    const image = new Image();
    image.src = new URL('@/assets/images/woman-wanting-pay-taxi-services 1.svg', import.meta.url).href;
    image.onload = () => {
        loaded.value = true;
    };
});
</script>

<style lang="scss" scoped>
.cabbie-history {
    background-image: url('@/assets/images/woman-wanting-pay-taxi-services 1-placeholder.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;
    box-sizing: border-box;
    transition: background-image 0.5s ease-in-out;

    &.loaded {
        background-image: url('@/assets/images/woman-wanting-pay-taxi-services 1.svg');
    }
}

.text-container {
    position: relative;
    width: 70%;
    background-image: linear-gradient(140deg, rgba(135, 135, 135, 0.1) 1%, rgba(135, 135, 135, 0.1) 100%);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    text-align: right;
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

.title {
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
}

.description {
    font-size: 28px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
}

@media (max-width: 768px) {
    .cabbie-history {
        height: auto;
        padding-right: 0;
    }

    .text-container {
        margin: 20px;
        padding: 20px;
    }

    .title {
        font-size: 30px;
    }

    .description {
        font-size: 20px;
    }
}
</style>