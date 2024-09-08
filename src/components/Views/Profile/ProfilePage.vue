<template>
<div class="profile-container">
    <aside class="sidebar" :class="{ 'hidden': !isSidebarOpen }">
        <button>DANE I DOKUMENTY</button>
        <button>WIADOMOŚCI</button>
        <button>PORTFEL</button>
        <button>FAKTURY</button>
        <button>USTAWIENIA</button>
        <button>RYCZAŁT</button>
    </aside>

    <button class="toggle-sidebar-btn" @click="toggleSidebar">
        <i :class="isSidebarOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"></i>
    </button>
</div>
</template>

<script>
export default {
    data() {
        return {
            isSidebarOpen: true
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        }
    }
};
</script>

<style lang="scss">
.profile-container {
    display: flex;
    height: 100vh;
    position: relative;
}

.sidebar {
    width: 200px;
    background-color: $secondary-color;
    padding: 20px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease-in-out;
    position: relative;
}

.sidebar.hidden {
    transform: translateX(-100%);
}

.sidebar button {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 16px;
    font-family: 'Roboto-Light', 'sans-serif';
    background-color: transparent;
    color: $title-light-font;
    border: none;
    cursor: pointer;
    text-align: left;
}

.sidebar button:first-child {
    margin-top: 30px;
}

.sidebar button:hover {
    font-weight: 700;
}

.toggle-sidebar-btn {
    position: absolute;
    top: 10px;
    left: 200px;
    background-color: $secondary-color;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: $title-light-font;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
}

.sidebar.hidden~.toggle-sidebar-btn {
    left: 10px;
}

.toggle-sidebar-btn:hover {
    background-color: $primary-color;
}
</style>