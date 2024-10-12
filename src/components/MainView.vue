<template>
<div>
    <div class="app-bar">
        <div class="app-logo">
            <img src="@/assets/images/logo.svg" alt="cabbie">
        </div>
        <button class="hamburger" @click="toggleNav">&#9776;</button>
        <nav ref="nav" :class="['nav', { 'nav--open': isNavOpen }]">
            <button v-for="item in navItems" :key="item.route" @click="handleNavItemClick(item)">
                {{ item.label }}
            </button>
            <div v-if="isAuthenticated">
                <button v-if="isMobile && !isFirstLogin" class="profile-button" @click="handleProfileButtonClick">PROFIL</button>
                <button v-if="isMobile && isFirstLogin" class="profile-button" @click="goToSurvey">FORMULARZ POCZĄTKOWY</button>
                <button v-if="!isMobile" class="profile-button" @click="handleProfileButtonClick">PROFIL</button>
                <div :class="['profile-menu', { 'open': isProfileMenuOpen }]">
                    <template v-if="!isFirstLogin">
                        <button @click="handleProfileMenuClick('DANE I DOKUMENTY')" class="profile-menu-button">
                            DANE I DOKUMENTY
                        </button>
                        <button v-for="menuItem in profileMenuItems" :key="menuItem" @click="isEmailVerified ? handleProfileMenuClick(menuItem) : null" :class="{ disabled: !isEmailVerified }">
                            {{ menuItem }}
                        </button>
                    </template>
                    <button v-if="isFirstLogin" @click="goToSurvey">FORMULARZ POCZĄTKOWY</button>
                    <button @click="handleLogout">WYLOGUJ</button>
                </div>
                <button class="mobile-logout-button" v-if="isMobile" @click="handleLogout">WYLOGUJ</button>
            </div>
            <button class="login-button" v-else @click="openLoginModal">LOGOWANIE</button>
        </nav>
    </div>

    <div class="content">
        <div class="router-view-container">
            <router-view />
        </div>

        <transition @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
            <div class="nav-overlay" v-if="isNavOpen"></div>
        </transition>
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

    <ModalForm :isVisible="isLoginModalVisible" @close="closeLoginModal" />
</div>
</template>

<script>
import ModalForm from './Views/LoginRegister/ModalForm.vue';
import Swal from 'sweetalert2';
import apiService from '@/apiService';
import {
    mapGetters,
    mapActions
} from 'vuex';
import {
    useToast
} from 'vue-toastification';

export default {
    components: {
        ModalForm
    },
    data() {
        return {
            isNavOpen: false,
            isLoginModalVisible: false,
            isProfileMenuOpen: false,
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
                }
            ],
            profileMenuItems: [
                'WIADOMOŚCI', 'PORTFEL', 'FAKTURY', 'USTAWIENIA ROZLICZEŃ', 'RYCZAŁT'
            ],
            isMobile: window.innerWidth <= 768
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'getFirstLogin', 'getRole', 'isEmailVerified', 'hasUnreadMessages']),
        isFirstLogin() {
            return this.getFirstLogin;
        },
    },

    async created() {
        try {
            if (this.isAuthenticated) {
                await this.$store.dispatch('isLogged');
                await this.$store.dispatch('fetchFirstLoginStatus');
                await this.$store.dispatch('getUserRole');
                await this.$store.dispatch('fetchUser');
            }

            const response = await apiService.get('/api/check-session');

            if (!response.data.logged_in) {
                this.$router.push({
                    name: 'Home'
                });
            }
        } catch (error) {
            console.error('Error checking session:', error);
            this.$router.push({
                name: 'Home'
            });
        }
    },
    methods: {
        ...mapActions(['logout']),
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        toggleProfileMenu() {
            this.isProfileMenuOpen = !this.isProfileMenuOpen;
        },
        navigateTo(route) {
            this.$router.push({
                name: route
            });
            this.isNavOpen = false;
            this.isProfileMenuOpen = false;
        },
        handleNavItemClick(item) {
            if (item.route) {
                this.navigateTo(item.route);
            } else {
                this.openLoginModal();
            }
        },
        handleProfileButtonClick() {
            if (this.isMobile) {
                this.navigateTo('Profile');
            } else {
                this.toggleProfileMenu();
            }
        },
        handleProfileMenuClick(menuItem) {
            let section = '';
            switch (menuItem) {
                case 'DANE I DOKUMENTY':
                    section = 'details';
                    break;
                case 'WIADOMOŚCI':
                    section = 'messages';
                    break;
                case 'PORTFEL':
                    section = 'wallet';
                    break;
                case 'FAKTURY':
                    section = 'invoices';
                    break;
                case 'USTAWIENIA ROZLICZEŃ':
                    section = 'billing-settings';
                    break;
                case 'RYCZAŁT':
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
                this.isProfileMenuOpen = false;
            }
        },
        goToSurvey() {
            this.navigateTo('Survey');
        },
        openLoginModal() {
            this.isLoginModalVisible = true;
        },
        closeLoginModal() {
            this.isLoginModalVisible = false;
        },
        async handleLogout() {
            try {
                await this.logout();
                Swal.fire({
                    title: 'Sukces!',
                    text: 'Wylogowano pomyślnie.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    this.$router.push({
                        name: 'Home'
                    });
                });
            } catch (error) {
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Wystąpił problem z wylogowaniem. Spróbuj ponownie.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        },
        handleClickOutside(event) {
            const nav = this.$refs.nav;
            if (this.isNavOpen && !nav.contains(event.target) && !event.target.closest('.hamburger')) {
                this.isNavOpen = false;
            }
            if (this.isProfileMenuOpen && !nav.contains(event.target) && !event.target.closest('.profile-menu')) {
                this.isProfileMenuOpen = false;
            }
        },
        handleKeyDown(event) {
            if (event.key === 'Escape' && this.isLoginModalVisible) {
                this.closeLoginModal();
            }
        },
        updateMobileStatus() {
            this.isMobile = window.innerWidth <= 768;
        },
        beforeEnterOverlay(el) {
            el.style.opacity = 0;
        },
        enterOverlay(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leaveOverlay(el, done) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 0;
            setTimeout(() => {
                this.closingModal = false;
                done();
            }, 300);
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        document.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('resize', this.updateMobileStatus);

        if (this.isAuthenticated) {
            const toast = useToast();
            this.$store.dispatch('checkIsThereAnyMessages')
                .then(() => {
                    if (this.hasUnreadMessages) {
                        toast.warning('Masz nieprzeczytane wiadomości!', {
                            timeout: 5000
                        });
                    }
                });
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('resize', this.updateMobileStatus);
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
    background-color: $secondary-color;
    color: $white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    z-index: 2;
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
    z-index: 2;
}

.nav button {
    background-color: transparent;
    border: none;
    color: $white;
    font-family: 'Roboto-Extra-Light', 'sans-serif';
    font-size: 18px;
    font-weight: 300;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 10px;
}

.nav button:hover {
    color: $primary-color;
    background-color: $background-color;
}

.profile-menu {
    position: fixed;
    top: 80px;
    right: 0;
    background-color: $secondary-color;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}

.profile-menu.open {
    transform: scaleY(1);
    opacity: 1;
}

.profile-menu button {
    background-color: transparent;
    text-align: right;
    border-bottom: 1px solid $background-color;
    color: $white;
    font-family: 'Roboto-Extra-Light', 'sans-serif';
    font-size: 16px;
    font-weight: 300;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 0;
}

.profile-menu button:last-child {
    border-bottom: none;
    border-bottom-left-radius: 20px;
}

.profile-menu button:hover {
    color: $tertiary-color;
    background-color: $primary-color;
}

.nav .profile-menu {
    display: flex;
    flex-direction: column;
}

.content {
    margin-top: 80px;
}

.router-view-container {
    z-index: 1;
}

@media (max-width: 768px) {
    .nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        position: fixed;
        top: 80px;
        right: 0;
        background-color: $secondary-color;
        width: 100%;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        transform: scaleY(0);
        transform-origin: top;
    }

    .nav--open {
        max-height: 500px;
        opacity: 1;
        transform: scaleY(1);
    }

    .hamburger {
        display: block;
    }

    .nav button {
        padding: 15px;
        border-radius: 15px;
        text-align: center;
    }

    .nav button.login-button {
        margin-bottom: 20px;
    }

    .profile-menu {
        top: 0;
    }

    .mobile-logout-button {
        display: block;
        background-color: transparent;
        border: none;
        color: $white;
        font-family: 'Roboto-Extra-Light', 'sans-serif';
        font-size: 16px;
        font-weight: 300;
        padding: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 10px;
        margin-top: 20px;
        width: 100%;
    }

    .mobile-logout-button:hover {
        color: $tertiary-color;
        background-color: $primary-color;
    }

    .profile-button {
        width: 100%;
        text-align: center;
    }
}

.app-logo img {
    height: 50px;
    width: 50px;
}

.nav .login-button {
    border-radius: 10px;
    color: $primary-color;
    transition: all 0.3s ease;
}

.nav .login-button:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border-color: $tertiary-color;
}

.nav .profile-button {
    color: $white;
    transition: all 0.3s ease;
    width: 100%;
}

.nav .profile-button:hover {
    color: $tertiary-color;
    background-color: $primary-color;
}

.nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
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

.disabled {
    pointer-events: none;
    opacity: 0.3;
    cursor: not-allowed;
}
</style>
