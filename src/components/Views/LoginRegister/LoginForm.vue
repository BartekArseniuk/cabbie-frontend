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
</div>
</template>

<script>
import Swal from 'sweetalert2';
import apiService from '@/apiService';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await apiService.post('/login', {
                    email: this.email,
                    password: this.password,
                });

                localStorage.setItem('authToken', response.data.token);
                this.$store.dispatch('login', response.data.token);

                // Check if this is the first login
                if (response.data.firstLogin) {
                    Swal.fire({
                        title: 'Witamy!',
                        text: 'Zalogowano pomyślnie. Zostaniesz przekierowany do formularza początkowego.',
                        icon: 'info',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        this.$emit('login');
                        this.$router.push({ name: 'Survey' });
                    });
                } else {
                    Swal.fire({
                        title: 'Sukces!',
                        text: 'Logowanie przebiegło pomyślnie.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        this.$emit('login');
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Wystąpił problem z logowaniem. Sprawdź dane i spróbuj ponownie.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },
        remindPassword() {
            // Handle remind password logic here
        },
        switchToRegister() {
            this.$emit('switch-form');
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

.input-group {
    margin-bottom: 10px;
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
    font-size: 12px;
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