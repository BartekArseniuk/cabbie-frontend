<template>
    <div class="lets-begin">
        <p class="title">ZACZNIJMY WSPÓŁPRACĘ</p>
        <button class="join">DOŁĄCZ</button>
    </div>
</template>

<style lang="scss" scoped>
.lets-begin {
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-direction: column;
    border-bottom: 1px solid $secondary-color;
}

.title {
    color: $title-light-font;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 42px;
    text-align: center;
}

.join {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 28px;
    padding: 20px 40px;
    transition: all 0.3s ease;
}

.join:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

@media (max-width: 768px) {
    .logo {
        height: 50vmin;
        margin-top: 10vh;
    }

    .logo img {
        max-height: 50%;
        max-width: 50%;
        height: auto;
        width: auto;
    }

    .title {
        font-size: 32px;
        margin-top: 100px;
    }
}
</style>