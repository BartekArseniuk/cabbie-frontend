<template>
    <div class="settlements">
        <div class="text-container">
            <p class="title">ROZLICZENIA</p>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const description = ref("Klarowne, łatwo dostępne oraz bardzo intuicyjne rozliczenia.");
</script>

<style lang="scss" scoped>
.settlements {
    background-color: $secondary-color;
    display: flex;
    justify-content: left;
}

.text-container {
    padding: 0 0 50px 50px;
    text-align: left;
}

.title {
    font-size: 32px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
}

.description {
    width: 60%;
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
}

@media (max-width: 768px) {
    .text-container {
        padding: 0 20px 50px 20px;
        text-align: left;
    }

    .title {
        font-size: 28px;
    }

    .description {
        width: 100%;
        font-size: 20px;
    }
}
</style>