<template>
<div class="fleet">
    <div class="text-container">
        <p class="title">Flota</p>
        <p class="description">
            Posiadamy swoją flotę samochodów oraz zaufanych parterów wynajmujących.
        </p>
        <p class="description">
            Auta są w pełni przystosowane do pracy.
        </p>
        <p class="description">
            Dzięki współpracy z branżą motoryzacyjną otrzymasz <span class="highlight">zniżki</span>
            na części oraz naprawy w zaufanych punktach.
        </p>
    </div>
</div>
</template>

<style lang="scss" scoped>
.fleet {
    background-image: url('@/assets/images/Group 40.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: background-image 0.5s ease-in-out;

    &.loaded {
        background-image: url('@/assets/images/elegant-uber-driver-giving-taxi-ride.svg');
    }
}

.title {
    font-size: 32px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
}

.text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 85vw;
    height: auto;
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

.description {
    font-size: 28px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
    text-align: right;
    width: 85%;
    margin: 0;
}

.highlight {
    color: $primary-color;
    font-weight: bold;
}

@media (max-width: 768px) {
    .cabbie-history {
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