<template>
    <div class="contact">
        <p v-if="props.showTitle" class="title">SKONTAKTUJ SIĘ Z NAMI</p>
        <form class="contact-form">
            <div class="input-row">
                <input v-model="firstName" type="text" placeholder="IMIĘ" class="input-field" />
                <input v-model="lastName" type="text" placeholder="NAZWISKO" class="input-field" />
                <input v-model="email" type="email" placeholder="E-MAIL" class="input-field" />
            </div>
            <textarea v-model="message" placeholder="TREŚĆ TWOJEJ WIADOMOŚCI" class="input-description"></textarea>
            <button type="submit" class="send">WYŚLIJ</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    showTitle: {
        type: Boolean,
        default: true
    }
});

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const message = ref('');
</script>

<style lang="scss" scoped>
.contact {
    height: auto;
    padding: 0 200px;
}

.title {
    text-align: left;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    margin-bottom: 20px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.input-row {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}

.input-field {
    padding: 10px;
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
    border: none;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $white;
    transition: all 0.3s ease;
    flex: 1;
    width: 100%;
}

.input-description {
    padding: 15px;
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
    border: none;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $white;
    transition: all 0.3s ease;
    height: 150px;
    resize: none;
}

.input-field:hover,
.input-field:focus,
.input-description:hover,
.input-description:focus {
    border: 2px solid $primary-color;
    outline: none;
}

.send {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 20px;
    padding: 10px 20px;
    width: 150px;
    margin-bottom: 50px;
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
        padding: 0 50px;
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