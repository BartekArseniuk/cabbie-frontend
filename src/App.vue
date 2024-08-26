<template>
<div>
    <div class="app-bar">
        <div class="app-logo">
            <img src="@/assets/images/logo.svg" alt="cabbie">
        </div>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <nav :class="['nav', { 'nav--open': isNavOpen }]">
            <button @click="navigateTo('Home')">STRONA GŁÓWNA</button>
            <button @click="navigateTo('Offer')">OFERTA</button>
            <button @click="navigateTo('AboutUs')">O NAS</button>
            <button>BLOG</button>
            <button>KONTAKT</button>
            <button class="login">LOGOWANIE</button>
        </nav>
    </div>
</div>
<div class="content">
    <router-view />
</div>

<footer>
    <div class="name">
        <img class="footer-logo" src="@/assets/images/ccabbiesinglelogobnw.svg" alt="Start Collaboration Image">
        <p>CABBIE SP. Z O. O.</p>
    </div>
    <p>Numer REGON: 527419171</p>
    <p>Numer NIP: 9662187143</p>
    <p>ul. Węgierska 49, 15-641 Krupniki (Białystok)</p>
    <p>+48 500061435</p>
    <p>info@cabbie.pl</p>
</footer>
<div class="under-footer">
    <p>WSZELKIE PRAWA AUTORSKIE ZASTRZEŻONE - CABBIE 2024</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            isNavOpen: false
        };
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        navigateTo(page) {
            this.$router.push({
                name: page
            });
            this.toggleNav();
        }
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
    background-color: $tertiary-color;
}

.app-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: $background-color;
    color: $white;
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
    color: $white;
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
    color: $white;
    font-family: 'Roboto-Extra-Light', 'sans-serif';
    font-size: 18px;
    font-weight: 300;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: color 0.3s ease, font-size 0.5s ease, font-weight 0.3s ease;
}

.nav button:hover {
    color: $primary-color;
    font-size: 20px;
    font-weight: bold;
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
        background-color: $background-color;
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
    color: $primary-color;
    transition: all 0.3s ease;
}

.nav button.login:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border-color: $tertiary-color;
    font-family: 'Roboto-Light', 'sans-serif';
}

footer {
    padding: 30px;
    background-color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    color: $tertiary-color;
}

.name {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.footer-logo {
    transform: scale(1);
}

.under-footer {
    text-align: center;
    font-family: 'Roboto-Light', 'sans-serif';
    color: $footer-background;
}
</style>