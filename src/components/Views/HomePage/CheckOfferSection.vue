<template>
    <div class="cabbie-offer">
        <div class="text-container">
            <p class="title">POZNAJ NASZĄ OFERTĘ</p>
            <div v-for="(offer, index) in offers" :key="index">
                <p class="description-title">{{ offer.title }}</p>
                <p class="description">{{ offer.description }}</p>
                <div class="strip" v-if="index < offers.length - 1"></div>
            </div>
            <!-- Dodanie przycisku -->
            <router-link to="/offer" class="offer-button">Zobacz ofertę</router-link>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const offers = computed(() => [
    {
        title: "BRAK PROWIZJI OD TWOICH ZAROBKÓW",
        description: "Oferujemy kierowcom pełne zarobki bez ukrytych prowizji."
    },
    {
        title: "TYGODNIOWE ROZLICZENIA",
        description: "Dopasuj przejrzyste rozliczenia do swoich potrzeb."
    },
    {
        title: "WSPÓLNE PARTNERSTWO",
        description: "Jesteśmy zawsze otwarci na współpracę i wsparcie dla kierowców."
    },
    {
        title: "ZŁOTY PROGRAM",
        description: "Zyskaj permanentne obniżenie kosztów rozliczeń."
    }
]);
</script>

<style lang="scss" scoped>
.cabbie-offer {
    background-color: $primary-color;
    height: auto;
    padding: 20px;
}

.text-container {
    text-align: center;
}

.title {
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
}

.description-title {
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
}

.description {
    font-size: 20px;
    font-family: 'Roboto-Extra-Light', sans-serif;
}

.strip {
    height: 0.5px;
    border-radius: 25px;
    width: 60%;
    background-color: $tertiary-color;
    margin: 0 auto;
}

.offer-button {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px 20px;
    font-size: 18px;
    font-family: 'Roboto-Light', sans-serif;
    background-color: $secondary-color;
    color: white;
    text-decoration: none;
    border-radius: 25px;
    transition: background-color 0.3s ease;
}

.offer-button:hover {
    background-color: darken($secondary-color, 10%);
}
</style>