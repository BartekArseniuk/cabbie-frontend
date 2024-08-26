<template>
    <div class="our-goal" id="ourgoal">
        <div class="text-container">
            <p class="title">NASZ WSPÓLNY CEL</p>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            description: "Naszym priorytetem są klarowne i transparentne rozliczenia oraz system wynagradzania bez ukrytych prowizji, co stanowi solidną podstawę wzajemnego zaufania. Jesteśmy tu, by wspierać Cię na każdym etapie współpracy, traktując nasze relacje partnersko i z pełnym zrozumieniem."
        };
    }
}
</script>

<style scoped>
.our-goal {
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
    width: 70%;
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