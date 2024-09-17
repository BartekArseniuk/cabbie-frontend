<template>
    <div>
        <p class="title">Przypomnij hasło</p>
        <form @submit.prevent="remindPassword">
            <div class="input-group">
                <input class="input" type="text" id="email" placeholder="e-mail" v-model="email" required />
            </div>
            <div class="button-group">
                <button class="button" type="submit">WYŚLIJ</button>
                <button class="button" @click="switchToLogin">ANULUJ</button>
            </div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            email: '',
        };
    },
    methods: {
        async remindPassword() {
            try {
                await this.$store.dispatch('forgotPassword', this.email);
                
                Swal.fire({
                    title: 'Sukces!',
                    text: 'Na podany adres e-mail został wysłany link do resetowania hasła.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    this.switchToLogin();
                });
            } catch (error) {
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Wystąpił problem z wysyłką linku do resetowania hasła. Spróbuj ponownie.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },
        switchToLogin() {
            this.$emit('switch-form', 'LoginForm');
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
    display: flex;
    margin-bottom: 20px;
}

.button-group {
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
    width: 100%;
    padding: 10px;
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
</style>