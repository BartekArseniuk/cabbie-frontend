<template>
<div class="profile-container">
    <aside class="sidebar" :class="{ 'hidden': isMobile }">
        <button v-for="(item, index) in menuItems" :key="index" @click="handleClick(item.component)" :class="{ 'disabled': !isEmailVerified}">
            {{ item.label }}
        </button>
    </aside>

    <div v-if="isMobile" class="mobile-menu">
        <button class="toggle-sidebar-btn" :class="{ 'collapsed': !isSidebarOpen, 'expanded': isSidebarOpen }" @click="toggleSidebar">
            <span v-if="!isSidebarOpen" class="component-label">
                {{ currentComponentLabel }}
            </span>
            <span v-if="isSidebarOpen" class="arrow-container">
                <span :class="{ 'arrow-down': !isSidebarOpen, 'arrow-up': isSidebarOpen }"></span>
            </span>
        </button>

        <div class="mobile-menu-content" :class="{ open: isSidebarOpen }">
            <button v-for="(item, index) in menuItems" :key="index" @click="handleClick(item.component)" :class="{ 'disabled': !isEmailVerified}">
                {{ item.label }}
            </button>
        </div>
        <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
    </div>

    <div class="driver-details-container">
        <transition name="fade-slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <component :is="currentComponent" :key="currentComponent" />
        </transition>
    </div>
</div>
</template>

<script>
import DriverDetails from './DriverDetails.vue';
import MessagesPage from '@/components/Common/MessagesPage.vue';
import WalletPage from './WalletPage.vue';
import InvoicesPage from './InvoicesPage.vue';
import BillingSettingsPage from './BillingSettingsPage.vue';
import LumpSumPage from './LumpSumPage.vue';
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    components: {
        DriverDetails,
        MessagesPage,
        WalletPage,
        InvoicesPage,
        BillingSettingsPage,
        LumpSumPage,
    },
    data() {
        return {
            isSidebarOpen: false,
            isMobile: window.innerWidth <= 768,
            currentComponent: 'DriverDetails',
            menuItems: [{
                    label: 'DANE I DOKUMENTY',
                    component: 'DriverDetails'
                },
                {
                    label: 'WIADOMOŚCI',
                    component: 'MessagesPage',
                },
                {
                    label: 'PORTFEL',
                    component: 'WalletPage',
                },
                {
                    label: 'FAKTURY',
                    component: 'InvoicesPage',
                },
                {
                    label: 'USTAWIENIA ROZLICZEŃ',
                    component: 'BillingSettingsPage',
                },
                {
                    label: 'RYCZAŁT',
                    component: 'LumpSumPage',
                },
            ],
        };
    },
    computed: {
        ...mapGetters(['getUser','isEmailVerified']),
        user() {
            return this.getUser || {};
        },
        currentComponentLabel() {
            const item = this.menuItems.find((item) => item.component === this.currentComponent);
            return item ? item.label : '';
        },
    },
    watch: {
        '$route.params.section': {
            handler(section) {
                this.loadComponent(section);
            },
            immediate: true
        }
    },
    methods: {
        loadComponent(section) {
            switch (section) {
                case 'details':
                    this.currentComponent = 'DriverDetails';
                    break;
                case 'messages':
                    this.currentComponent = 'MessagesPage';
                    break;
                case 'wallet':
                    this.currentComponent = 'WalletPage';
                    break;
                case 'invoices':
                    this.currentComponent = 'InvoicesPage';
                    break;
                case 'billing-settings':
                    this.currentComponent = 'BillingSettingsPage';
                    break;
                case 'lump-sum':
                    this.currentComponent = 'LumpSumPage';
                    break;
                default:
                    this.currentComponent = 'DriverDetails';
            }
        },
        ...mapActions(['fetchUser', 'updateUser']),
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        handleResize() {
            this.isMobile = window.innerWidth <= 768;
            if (!this.isMobile) {
                this.isSidebarOpen = false;
            }
        },
        handleClickOutside(event) {
            const menu = this.$el.querySelector('.mobile-menu');
            if (menu && !menu.contains(event.target) && this.isSidebarOpen) {
                this.isSidebarOpen = false;
            }
        },
        handleClick(component) {
            let section = '';
            switch (component) {
                case 'DriverDetails':
                    section = 'details';
                    break;
                case 'MessagesPage':
                    section = 'messages';
                    break;
                case 'WalletPage':
                    section = 'wallet';
                    break;
                case 'InvoicesPage':
                    section = 'invoices';
                    break;
                case 'BillingSettingsPage':
                    section = 'billing-settings';
                    break;
                case 'LumpSumPage':
                    section = 'lump-sum';
                    break;
            }
            if (section) {
                this.$router.push({
                    name: 'Profile',
                    params: {
                        section
                    }
                });
                this.isSidebarOpen = false;
            }
        },
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateX(20px)';
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = 1;
            el.style.transform = 'translateX(0)';
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = 0;
            el.style.transform = 'translateX(20px)';
            done();
        },
    },
    async created() {
        await this.$store.dispatch('fetchUser');
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        document.addEventListener('mousedown', this.handleClickOutside);
        this.loadComponent(this.$route.params.section);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
};
</script>

<style lang="scss">
.profile-container {
    display: flex;
    height: auto;
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
    z-index: 0;
}

.sidebar.hidden {
    display: none;
}

.sidebar button {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 14px;
    white-space: nowrap;
    border-radius: 15px;
    font-family: 'Roboto-Light', sans-serif;
    background-color: transparent;
    color: $title-light-font;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.sidebar button.disabled,
.mobile-menu-content button.disabled {
    color: $placeholder-color;
    cursor: not-allowed;
    pointer-events: none;
}

.sidebar button:hover:not(.disabled) {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.1);
}

.toggle-sidebar-btn {
    background-color: $secondary-color;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: $title-light-font;
    padding: 10px;
    border-radius: 20px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    width: 80%;
    height: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
}

.toggle-sidebar-btn.collapsed {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    z-index: 1;
}

.toggle-sidebar-btn.expanded {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.arrow-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-up {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    transition: border-color 0.3s ease;
}

.arrow-down {
    border-top: 6px solid $title-light-font;
}

.arrow-up {
    border-bottom: 6px solid $title-light-font;
    border-top: none;
}

.mobile-menu-content {
    display: flex;
    flex-direction: column;
    background-color: $secondary-color;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%) scaleY(0);
    transform-origin: top;
    width: 80%;
    z-index: 3;
    transition: transform 0.4s ease, opacity 0.4s ease;
    opacity: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    align-items: center;
}

.mobile-menu-content.open {
    transform: translateX(-50%) scaleY(1);
    opacity: 1;
}

.mobile-menu-content button {
    width: 100%;
    margin: 10px 0;
    padding: 15px;
    font-size: 16px;
    font-family: 'Roboto-Light', sans-serif;
    background-color: transparent;
    color: $title-light-font;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.mobile-menu-content button.disabled {
    color: $placeholder-color;
    cursor: not-allowed;
    pointer-events: none;
}

.mobile-menu-content button:hover:not(.disabled) {
    font-weight: 700;
    transform: scale(1.02);
}

@media (min-width: 769px) {
    .mobile-menu {
        display: none;
    }
}

.driver-details-container {
    margin-left: 10px;
    margin-right: 20px;
    width: 100%;
}

@media (max-width: 768px) {
    .driver-details-container {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        margin-top: 75px;
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 2;
    display: none;
}

.mobile-menu .overlay {
    display: block;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>