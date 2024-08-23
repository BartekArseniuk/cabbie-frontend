<template>
<div>
    <div class="app-bar">
        <div class="app-logo">
            <img src="@/assets/images/logo.svg" alt="cabbie">
        </div>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <nav :class="['nav', { 'nav--open': isNavOpen }]">
            <button>STRONA GŁÓWNA</button>
            <button>OFERTA</button>
            <button>O NAS</button>
            <button>BLOG</button>
            <button>KONTAKT</button>
            <button class="login">LOGOWANIE</button>
        </nav>
    </div>
</div>
<div class="content">
    <HomePage />
</div>
</template>

<script>
import HomePage from './components/HomePage/HomePage.vue';

export default {
    data() {
        return {
            isNavOpen: false
        };
    },
    components: {
        HomePage
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        }
    }
};
</script>

<style>
body {
    margin: 0;
    background-color: #1E1E1E;
}

.app-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #494444;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    z-index: 99;
}

.hamburger {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.nav {
    display: flex;
    gap: 20px;
}

.nav button {
    background: none;
    border: none;
    color: white;
    font-family: 'Roboto-Extra-Light', 'sans-serif';
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.nav button:hover {
    color: #FCB331;
}

.content {
    margin-top: 60px;
}

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 0;
        background-color: #494444;
        width: 100%;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.3s ease;
    }

    .nav--open {
        max-height: 500px;
        opacity: 1;
    }

    .hamburger {
        display: block;
    }

    .nav button {
        padding: 15px;
    }

    .nav button.login {
        margin-bottom: 20px;
    }
}

.app-logo img {
    height: 70px;
    width: 70px;
    margin-top: 10px;
}

.nav button.login {
    color: #FCB331;
    transition: all 0.3s ease;
}

.nav button.login:hover {
    color: #1e1e1e;
    background-color: #FCB331;
    border-color: #1e1e1e;
    font-family: 'Roboto-Light', 'sans-serif';
}
</style>