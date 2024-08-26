<template>
    <div class="welcome-page">
        <div class="logo">
            <img src="@/assets/images/cabbie-logo.svg" alt="cabbie" />
        </div>
        <p class="title">PARTNER KIEROWCÓW APLIKACJI TAXI</p>
        <button class="lets-begin" @click="scrollToGoal">POZNAJMY SIĘ</button>
    </div>
</template>

<script>
export default {
    name: 'WelcomePage',
    methods: {
        scrollToGoal() {
            const goalElement = document.getElementById('ourgoal');
            if (goalElement) {
                const rect = goalElement.getBoundingClientRect();
                window.scrollTo({
                    top: window.pageYOffset + rect.top - 100,
                    behavior: 'smooth'
                });
            }
        }

    }
};
</script>

<style lang="scss" scoped>
.welcome-page {
    background-image: url('@/assets/images/driver-dressed-elegant-costume 1.svg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.logo {
    background-color: $primary-color;
    height: 20vmin;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
}

.logo img {
    max-height: 75%;
    max-width: 75%;
    height: auto;
    width: auto;
}

.title {
    color: $title-light-font;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 42px;
    margin-top: 80px;
    text-align: center;
}

.lets-begin {
    background-color: transparent;
    border: 2px solid $primary-color;
    border-radius: 8px;
    color: $primary-color;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 28px;
    padding: 10px 20px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lets-begin:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border-color: $tertiary-color;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
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