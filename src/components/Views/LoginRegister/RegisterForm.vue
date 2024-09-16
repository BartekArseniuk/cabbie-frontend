<template>
<div>
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
            Hasło musi mieć co najmniej 12 znaków i zawierać:
            <ul>
                <li>Jedną małą literę</li>
                <li>Jedną wielką literę</li>
                <li>Jedną cyfrę</li>
                <li>Jeden znak specjalny (np. !, @, #, $)</li>
            </ul>
        </p>
        <div class="buttons-group">
            <button class="button" type="submit">ZAREJESTRUJ</button>
            <button class="button" type="button" @click="switchToLogin">ANULUJ</button>
        </div>
    </form>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showPassword: false,
        };
    },
    methods: {
        async register() {
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
                if (error.response && error.response.data) {
                    console.error('Błąd rejestracji:', error.response.data);
                    Swal.fire({
                        title: 'Błąd!',
                        text: error.response.data.message || 'Wystąpił problem z rejestracją. Spróbuj ponownie.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                } else {
                    Swal.fire({
                        title: 'Błąd!',
                        text: 'Wystąpił problem z rejestracją. Spróbuj ponownie.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        },
        switchToLogin() {
            this.$emit('switch-form');
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
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
