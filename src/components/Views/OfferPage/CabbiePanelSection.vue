<template>
    <div class="cabbie-panel">
        <div class="text-container">
            <p class="title">PANEL CABBIE</p>
            <p class="description">
                Zautomatyzowany system obsługi kierowcy oparty na sprawdzonych procesach:
                optymalizacji licencjonowania, zatrudniania oraz rozliczania i obsługi kierowców.
            </p>
            <p class="description">
                Cenimy sobie Wasze opinie dlatego za każdy wartościowy feedback
                gwarantujemy Bonusy. Naszym celem jest rozwój społeczności <span class="highlight">Cabbie</span>.
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cabbie-panel {
    background-color: $secondary-color;
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
    color: $primary-color;
}

.description {
    width: 80%;
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
}

.highlight {
  color: $primary-color;
  font-weight: bold;
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