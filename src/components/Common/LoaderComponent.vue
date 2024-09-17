<template>
<div class="loader-wrapper">
    <div class="loader"></div>
    <p class="loading-text">Ładowanie...</p>
</div>
</template>
  
<style lang="scss">
.loader-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $tertiary-color;
}

.loader {
    border: 16px solid $secondary-color;
    border-top: 16px solid $primary-color;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
}

.loading-text {
    margin-top: 20px;
    font-family: 'Roboto-Extra-Light', 'sans-serif';
    font-size: 18px;
    font-weight: 300;
    color: $white;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>