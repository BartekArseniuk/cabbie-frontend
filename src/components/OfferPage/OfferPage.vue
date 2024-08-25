<template>
    <p class="title">NASZA OFERTA</p>
    <main>
        <section id="settlements">
            <SettlementsPage />
        </section>
        <section id="car-fleet">
        </section>
        <section id="building-a-brand-together">
        </section>
        <section id="lets-start-cooperation">
        </section>
        <section id="-contact">
        </section>
    </main>
</template>

<script>
import SettlementsPage from './SettlementsPage.vue';

export default {
    components: {
        SettlementsPage
    }
};
</script>

<style scoped>

.title {
    text-align: center;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: #FCB331;
    margin-top: 100px;
}

main section {
    width: 100%;
    margin: 0;
}
</style>
