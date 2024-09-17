<template>
<div>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <LoaderComponent v-if="isLoading" class="loading" />
    </transition>

    <div v-if="!isLoading">
        <p class="title">REJESTRACJA</p>
        <form @submit.prevent="register">
            <div class="input-group">
                <input class="input" type="text" id="first_name" placeholder="imię" v-model="firstName" required />
                <input class="input" type="text" id="last_name" placeholder="nazwisko" v-model="lastName" required />
            </div>
            <div class="input-group">
                <input class="input" type="text" id="email" placeholder="e-mail" v-model="email" required />
            </div>
            <div class="input-group password-group">
                <input class="input password-input" :type="showPassword ? 'text' : 'password'" id="password" placeholder="hasło" v-model="password" required />
                <button class="password-toggle" @click="togglePasswordVisibility" type="button">
                    <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
                </button>
            </div>
            <p class="password-requirements">
                Hasło musi zawierać minimum:
                <ul>
                    <li :class="{'valid': hasLowercase, 'invalid': !hasLowercase}">Jedną małą literę</li>
                    <li :class="{'valid': hasUppercase, 'invalid': !hasUppercase}">Jedną wielką literę</li>
                    <li :class="{'valid': hasDigit, 'invalid': !hasDigit}">Jedną cyfrę</li>
                    <li :class="{'valid': hasSpecialChar, 'invalid': !hasSpecialChar}">Jeden znak specjalny (np. !, @, #, $)</li>
                    <li :class="{'valid': isLongEnough, 'invalid': !isLongEnough}">Co najmniej 12 znaków</li>
                </ul>
            </p>
            <div class="buttons-group">
                <button class="button" type="submit">ZAREJESTRUJ</button>
                <button class="button" type="button" @click="switchToLogin">ANULUJ</button>
            </div>
        </form>
    </div>
</div>
</template>

  
<script>
import Swal from 'sweetalert2';
import LoaderComponent from '@/components/Common/LoaderComponent.vue';

export default {
    components: {
        LoaderComponent,
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showPassword: false,
            isLoading: false,
            loaderTimeout: null,
        };
    },
    computed: {
        hasLowercase() {
            return /[a-z]/.test(this.password);
        },
        hasUppercase() {
            return /[A-Z]/.test(this.password);
        },
        hasDigit() {
            return /\d/.test(this.password);
        },
        hasSpecialChar() {
            return /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
        },
        isLongEnough() {
            return this.password.length >= 12;
        },
    },
    methods: {
        async register() {
            this.loaderTimeout = setTimeout(() => {
                this.isLoading = true;
            }, 500);

            try {
                await this.$store.dispatch('register', {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    email: this.email,
                    password: this.password,
                });

                Swal.fire({
                    title: 'Sukces!',
                    text: 'Rejestracja przebiegła pomyślnie.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    this.switchToLogin();
                });
            } catch (error) {
                let errorMessage = 'Wystąpił problem z rejestracją. Spróbuj ponownie.';

                if (error.message === 'Email already taken') {
                    errorMessage = 'Adres e-mail jest już zajęty.';
                } else if (error.message === 'Incorrect password') {
                    errorMessage = 'Hasło jest nieprawidłowe.';
                }

                Swal.fire({
                    title: 'Błąd!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                clearTimeout(this.loaderTimeout);
                this.isLoading = false;
            }
        },
        switchToLogin() {
            this.$emit('switch-form');
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.6s';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = 0;
            done();
        },
    },
};
</script>

  
<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: 30px;
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
}

form {
    padding-left: 40px;
    padding-right: 40px;
}

.input-group {
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
}

.password-group {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    font-size: 18px;
    color: $white;
}

.buttons-group {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
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
    width: 100%;
    padding: 10px;
    padding-right: 50px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 15px;
    flex: 1;
}

.input:hover,
.input:focus {
    border: 2px solid $primary-color;
}

.password-requirements {
    font-family: 'Roboto-Extra-Light', 'sans-serif';
    color: $white;
    font-size: 12px;
    padding: 10px;

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 5px;

        &.valid {
            color: $primary-color;
        }

        &.invalid {
            color: $white;
        }
    }
}

@media (max-width: 768px) {
    form {
        padding-left: 0;
        padding-right: 0;
    }

    .input-group {
        flex-direction: column;
        max-width: 75%;
    }

    .password-toggle {
        right: -50px;
    }
}
</style>