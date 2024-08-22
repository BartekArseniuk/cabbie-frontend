<template>
<div>
    <div class="app-bar">
        <div class="logo"></div>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <nav :class="['nav', { 'nav--open': isNavOpen }]">
            <button>STRONA GŁÓWNA</button>
            <button>OFERTA</button>
            <button>O NAS</button>
            <button>BLOG</button>
            <button>KONTAKT</button>
            <button>LOGOWANIE</button>
        </nav>
    </div>
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
        }
    }
}
</script>

<style>
.app-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #494444;
    color: white;
    font-size: 16px;
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
    font-size: 1em;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.nav button:hover {
    color: #FCB331;
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
}
</style>