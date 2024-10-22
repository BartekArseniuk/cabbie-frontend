<template>
<div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
        <h2>WPROWADŹ KOD WERYFIKACYJNY</h2>
        <div class="input-group">
            <input v-for="(digit, index) in digits" :key="index" :ref="`input-${index}`" type="text" class="verification-input" maxlength="1" v-model="code[index]" @input="handleInput(index)" @keydown="handleKeydown($event, index)" @focus="selectInput(index)" />
        </div>
        <div class="button-group">
            <button @click="submitCode" class="submit-button">ZWERYFIKUJ</button>
            <button @click="handleLogout" class="logout-button">WYLOGUJ</button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            digits: Array(6).fill(0),
            code: ['', '', '', '', '', ''],
        };
    },
    methods: {
        ...mapActions(['logout', 'verifyCode']),

        handleInput(index) {
            if (this.code[index].length > 1) {
                this.code[index] = this.code[index].slice(0, 1);
            }
            if (this.code[index] && index < this.digits.length - 1) {
                this.$refs[`input-${index + 1}`][0].focus();
            }
        },
        handleKeydown(event, index) {
            if (event.key === 'Backspace' && !this.code[index] && index > 0) {
                this.$refs[`input-${index - 1}`][0].focus();
            }
        },
        selectInput(index) {
            this.$refs[`input-${index}`][0].select();
        },
        submitCode() {
            const verificationCode = this.code.join('');
            if (verificationCode.length < 6) {
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Proszę wprowadzić pełny kod weryfikacyjny.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            this.verifyCode(verificationCode)
                .then(() => {
                    Swal.fire({
                        title: 'Sukces!',
                        text: 'Kod weryfikacyjny został zaakceptowany.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.$emit('close-verification');
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Błąd!',
                        text: error.message || 'Weryfikacja nie powiodła się. Spróbuj ponownie.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        },

        handleLogout() {
            this.logout()
                .then(() => {
                    Swal.fire({
                        title: 'Wylogowano!',
                        text: 'Zostałeś pomyślnie wylogowany.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        this.closeModal();
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Błąd!',
                        text: error.message || 'Wylogowanie nie powiodło się.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        },
        closeModal() {
            this.$emit('close-verification');
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $tertiary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    width: 80%;
    max-width: 400px;
}

h2 {
    color: $white;
    padding: 5px;
    text-align: center;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.verification-input {
    width: 40px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    border: 2px solid $white;
    border-radius: 10px;
    background-color: $secondary-color;
    color: $white;
    outline: none;
    transition: border-color 0.3s;
}

.verification-input:focus {
    border-color: $primary-color;
}

.button-group {
    display: flex;
    gap: 10px;
    flex-direction: column;
}

.submit-button,
.logout-button {
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 8px 15px;
    width: 150px;
    transition: all 0.3s ease;
    color: $tertiary-color;
    border: 2px solid transparent;
}

.submit-button {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $primary-color;
}

.submit-button:hover {
    background-color: darken($primary-color, 10%);
    border-color: darken($primary-color, 10%);
    transform: scale(1.05);
}

.logout-button {
    color: $white;
    background-color: $remind-password;
    border: 2px solid $remind-password;
}

.logout-button:hover {
    background-color: darken($remind-password, 10%);
    border-color: darken($remind-password, 10%);
    transform: scale(1.05);
}
</style>