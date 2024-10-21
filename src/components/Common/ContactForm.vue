<template>
    <div class="contact">
        <p v-if="props.showTitle" class="title">SKONTAKTUJ SIĘ Z NAMI</p>
        <form class="contact-form" @submit.prevent="submitContactForm">
            <div class="input-row">
                <input v-model="firstName" type="text" placeholder="IMIĘ" class="input-field" required />
                <input v-model="lastName" type="text" placeholder="NAZWISKO" class="input-field" required />
                <input v-model="email" type="email" placeholder="E-MAIL" class="input-field" required />
            </div>
            <textarea v-model="message" placeholder="TREŚĆ TWOJEJ WIADOMOŚCI" class="input-description" required></textarea>
            <button type="submit" class="send">WYŚLIJ</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    showTitle: {
        type: Boolean,
        default: true
    }
});

const store = useStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const message = ref('');

const submitContactForm = async () => {
    try {
        await store.dispatch('sendContactEmail', {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            message: message.value
        });
        
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        message.value = '';
    } catch (error) {
        console.error('Błąd podczas wysyłania formularza:', error);
    }
};
</script>

<style lang="scss" scoped>
.contact {
    padding: 0 100px;
}

.title {
    text-align: left;
    font-size: 30px;
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    margin-bottom: 20px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.input-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.input-field {
    padding: 8px; 
    font-size: 20px; 
    font-family: 'Roboto-Light', sans-serif;
    border: 2px solid transparent;
    border-radius: 12px; 
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $white;
    transition: border 0.3s ease;
    flex: 1;
    outline: none;
}

.input-description {
    padding: 10px;
    font-size: 20px;
    font-family: 'Roboto-Light', sans-serif;
    border: 2px solid transparent;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $white;
    transition: border 0.3s ease;
    height: 150px;
    resize: none;
    outline: none;
    overflow-y: auto;
}

.input-description::-webkit-scrollbar {
    width: 8px;
}

.input-description::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
}

.input-description::-webkit-scrollbar-track {
    background: $scroll-track;
    border-radius: 10px;
}

.input-field:hover,
.input-field:focus,
.input-description:hover,
.input-description:focus {
    border: 2px solid $primary-color;
}

.send {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 8px 15px;
    width: 120px;
    margin-bottom: 30px;
    transition: all 0.3s ease;
    color: $tertiary-color;
}

.send:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

@media (max-width: 768px) {
    .contact {
        height: auto;
        padding: 0 20px;
    }

    .input-row {
        flex-direction: column;
        gap: 10px;
    }

    .contact-form {
        gap: 10px;
    }
}
</style>