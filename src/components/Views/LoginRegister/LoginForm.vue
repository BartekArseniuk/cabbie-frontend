<template>
<div>
    <p class="title">LOGOWANIE</p>
    <form @submit.prevent="login">
        <div class="input-group">
            <input class="input" type="text" id="email" placeholder="e-mail" v-model="email" required />
        </div>
        <div class="input-group">
            <input class="input" type="password" id="password" placeholder="hasło" v-model="password" required />
        </div>
        <div class="remind-password">
            <button class="remind-password-button" type="button" @click="remindPassword">
                Nie pamiętam hasła
            </button>
        </div>
        <div class="buttons-group">
            <button class="button" type="submit">ZALOGUJ</button>
            <button class="button" type="button" @click="switchToRegister">
                ZAREJESTRUJ
            </button>
        </div>
    </form>

    <transition name="modal" @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
        <div v-if="showVerification" class="modal-backdrop" @click.self="closeVerification">
            <transition name="modal-content" @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
                <div class="modal">
                    <AdminVerification @close-verification="closeVerification" />
                </div>
            </transition>
        </div>
    </transition>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import AdminVerification from '../AdminPanel/AdminVerification.vue';

export default {
    components: {
        AdminVerification,
    },
    data() {
        return {
            email: '',
            password: '',
            showVerification: false,
        };
    },
    methods: {
        async login() {
            try {
                const response = await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password,
                });

                if (response && response.message === 'verification_required') {
                    this.showVerification = true;
                    return;
                }

                const firstLogin = this.$store.getters.getFirstLogin;

                if (firstLogin) {
                    await Swal.fire({
                        title: 'Witamy!',
                        text: 'Zalogowano pomyślnie. Zostaniesz przekierowany do formularza początkowego.',
                        icon: 'info',
                        confirmButtonText: 'OK',
                    });
                    this.$emit('login');
                    this.$router.push({
                        name: 'Survey'
                    });
                } else {
                    await Swal.fire({
                        title: 'Sukces!',
                        text: 'Logowanie przebiegło pomyślnie.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                    this.$emit('login');
                }
            } catch (error) {
                await Swal.fire({
                    title: 'Błąd!',
                    text: error.message || 'Wystąpił problem z logowaniem. Sprawdź dane i spróbuj ponownie.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

        },
        remindPassword() {
            this.$emit('switch-form', 'RemindPassword');
        },
        switchToRegister() {
            this.$emit('switch-form', 'RegisterForm');
        },
        closeVerification() {
            this.showVerification = false;
            this.$emit('login');
        },
        beforeEnterOverlay(el) {
            el.style.opacity = 0;
            el.style.visibility = 'visible';
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
            setTimeout(done, 300);
        },
        beforeEnterModal(el) {
            el.style.transform = 'scale(0.7)';
            el.style.opacity = 0;
        },
        enterModal(el, done) {
            el.offsetHeight;
            el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            el.style.transform = 'scale(1)';
            el.style.opacity = 1;
            done();
        },
        leaveModal(el, done) {
            el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            el.style.transform = 'scale(0.7)';
            el.style.opacity = 0;
            setTimeout(done, 300);
        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: 24px;
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
}

.input-group {
    margin-bottom: 8px;
}

.input {
    color: $white;
    font-size: 18px;
    padding: 8px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 10px;
}

.buttons-group {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0 auto;
}

.button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 10px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.remind-password {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 5px;
    margin-bottom: 10px;
}

.remind-password-button {
    cursor: pointer;
    color: $remind-password;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 10px;
    background-color: transparent;
    border: none;
    transition: color 0.3s ease;
}

.remind-password-button:hover {
    color: $primary-color;
}

.buttons-group {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
}

.button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.button:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.input {
    color: $white;
    font-size: 22px;
    padding: 10px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 15px;
}

.input:hover,
.input:focus {
    border: 2px solid $primary-color;
}
</style>