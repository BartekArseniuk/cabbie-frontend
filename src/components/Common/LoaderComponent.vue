<template>
<div class="loader-wrapper">
    <div class="loader"></div>
    <p class="loading-text">Ładowanie</p>
    <div class="street-wrapper">
        <img src="@/assets/images/Car.svg" class="car" />
        <div class="street"></div>
    </div>
</div>
</template>

<style lang="scss">
.loader-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $primary-color;
    border-radius: 20px;
    width: 450px;
    height: 300px;
    position: relative;
}

.loading-text {
    margin-top: 50px;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 24px;
    font-weight: 600;
    color: $tertiary-color;
}

.street-wrapper {
    position: relative;
    width: 80%;
    height: 120px;
    overflow: hidden;
}

.street {
    width: 100%;
    height: 3px;
    background-color: $tertiary-color;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
}

.car {
    position: absolute;
    bottom: 3px;
    left: 0px;
    width: 120px;
    animation: drive 3s linear infinite;
}

@keyframes drive {
    0% {
        left: -120px;
    }

    100% {
        left: 100%;
    }
}

@media (max-width: 768px) {
    .loader-wrapper {
        width: 80%;
    }

    .car {
        animation: drive 2s linear infinite;
    }
}
</style>
