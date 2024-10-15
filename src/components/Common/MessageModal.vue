<template>
<div class="modal-overlay" v-if="isVisible" @click.self="closeModal">
    <div class="modal-content">
        <h2 class="title">NOWA WIADOMOŚĆ</h2>

        <label v-if="getRole === 'admin'" class="input-label">
            <input type="checkbox" v-model="isGlobal" />
            <span></span>
            Wiadomość globalna
        </label>

        <input class="input" type="text" v-model="receiver" id="receiver" placeholder="Do: " v-if="getRole === 'admin' && !isGlobal" />

        <input class="input" type="text" v-model="title" id="title" placeholder="Tytuł: " />
        <textarea v-model="message" id="message" placeholder="Treść: "></textarea>

        <button class="send-button" @click="sendMessage">Wyślij</button>
        <button class="close-modal-button" @click="closeModal">Anuluj</button>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import {
    mapGetters
} from 'vuex';

export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            receiver: "",
            title: "",
            message: "",
            isGlobal: false,
        };
    },
    computed: {
        ...mapGetters(['getRole']),
    },
    methods: {
        async sendMessage() {
            try {
                if (this.getRole !== 'admin' && !this.isGlobal) {
                    this.receiver = "admin@example.com";
                }

                await this.$store.dispatch('sendMessage', {
                    isGlobal: this.isGlobal,
                    receiver: this.receiver,
                    title: this.title,
                    message: this.message,
                });

                Swal.fire("Wiadomość wysłana!", this.isGlobal ?
                    "Twoja globalna wiadomość została pomyślnie wysłana." :
                    "Twoja wiadomość została pomyślnie wysłana.", "success");

                this.closeModal();
            } catch (error) {
                console.error("Error sending message:", error);
                Swal.fire("Błąd!", "Nie udało się wysłać wiadomości. Sprawdź czy e-mail jest poprawny", "error");
            }
        },
        closeModal() {
            this.$emit("close");
            this.receiver = "";
            this.title = "";
            this.message = "";
            this.isGlobal = false;
        },
        handleKeyDown(event) {
            if (event.key === "Escape") {
                this.closeModal();
            }
        },
    },
    mounted() {
        window.addEventListener("keydown", this.handleKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
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
    z-index: 2;
}

.modal-content {
    display: flex;
    flex-direction: column;
    width: 60%;
    height: auto;
    background-color: $tertiary-color;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    font-size: 24px;
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
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
    margin-bottom: 10px;
    max-width: 100%;
}

.input:hover,
.input:focus {
    border: 2px solid $primary-color;
}

textarea {
    color: $white;
    font-size: 18px;
    padding: 8px;
    background-color: $secondary-color;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    border-radius: 10px;
    margin-bottom: 10px;
    max-width: 100%;
    height: 150px;
    resize: none;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: $scroll-track;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $primary-color;
        border-radius: 10px;
    }
}

textarea:hover,
textarea:focus {
    border: 2px solid $primary-color;
}

.send-button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    width: 150px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    margin: 0 auto;
    margin-bottom: 8px;
}

.close-modal-button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 15px;
    width: 150px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    margin: 0 auto;
}

button:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.input-label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 8px;
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    cursor: pointer;

    input {
        display: none;
    }

    span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid $primary-color;
        border-radius: 4px;
        margin-right: 10px;
        position: relative;
        background-color: $tertiary-color;
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    input:checked+span {
        background-color: $primary-color;
        border-color: $primary-color;
    }

    input:checked+span::after {
        content: "";
        position: absolute;
        top: 40%;
        left: 50%;
        width: 10px;
        height: 6px;
        border: solid $tertiary-color;
        border-width: 0 0 2px 2px;
        transform: translate(-50%, -40%) rotate(-45deg);
    }

    span:hover {
        background-color: lighten($primary-color, 20%);
        border-color: $primary-color;
    }

    input:focus+span {
        outline: 2px solid $primary-color;
        outline-offset: 4px;
    }
}
</style>