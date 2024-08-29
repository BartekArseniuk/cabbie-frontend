<template>
<div>
    <div class="app-bar">
        <div class="app-logo">
            <img src="@/assets/images/logo.svg" alt="cabbie">
        </div>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <nav ref="nav" :class="['nav', { 'nav--open': isNavOpen }]">
            <button v-for="item in navItems" :key="item.name" @click="navigateTo(item.route)">
                {{ item.label }}
            </button>
        </nav>
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
</div>
</template>

<script>
export default {
    data() {
        return {
            isNavOpen: false,
            navItems: [{
                    label: 'STRONA GŁÓWNA',
                    route: 'Home'
                },
                {
                    label: 'OFERTA',
                    route: 'Offer'
                },
                {
                    label: 'O NAS',
                    route: 'AboutUs'
                },
                {
                    label: 'BLOG',
                    route: 'Blog'
                },
                {
                    label: 'KONTAKT',
                    route: 'Contact'
                },
                {
                    label: 'LOGOWANIE'
                },
            ]
        };
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        navigateTo(route) {
            this.$router.push({
                name: route
            });
            this.isNavOpen = false;
        },
        handleClickOutside(event) {
            const nav = this.$refs.nav;
            if (this.isNavOpen && nav && !nav.contains(event.target) && !event.target.closest('.hamburger')) {
                this.isNavOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
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
    height: 50px;
    width: 50px;
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