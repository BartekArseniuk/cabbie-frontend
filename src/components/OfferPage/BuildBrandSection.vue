<template>
    <div class="build-brand">
        <div class="text-container">
            <p class="title">WSPÓLNE BUDOWANIE MARKI</p>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            description: "Dołącz do nas i pomóż w budowaniu marki Cabbie, zrzeszając jak najwięcej kierowców. Jesteśmy partnerem rozliczeniowym dla aplikacji przewozowych."
        };
    }
}
</script>

<style scoped>
.build-brand {
    background-color: #363434;
    display: flex;
    justify-content: left;
}

.text-container {
    padding: 0 0 50px 50px;
    text-align: left;
}

.title {
    font-size: 32px;
    font-family: 'Roboto-Light', sans-serif;
    color: #FCB331;
}

.description {
    width: 50%;
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: #f0f0f0;
}

@media (max-width: 768px) {
    .text-container {
        padding: 0 20px 50px 20px;
        text-align: left;
    }

    .title {
        font-size: 28px;
    }

    .description {
        width: 100%;
        font-size: 20px;
    }
}
</style>