<template>
    <p class="title">NASZA OFERTA</p>
    <main>
        <section id="settlements">
            <SettlementsSection />
        </section>
        <section id="car-fleet">
            <CarFleetSection />
        </section>
        <section id="building-a-brand-together">
            <BuildBrandSection />
        </section>
        <section id="lets-start-cooperation">
            <LetsBeginSection />
        </section>
        <section id="contact">
            <ContactForm />
        </section>
    </main>
</template>

<script>
import SettlementsSection from './SettlementsSection.vue';
import CarFleetSection from './CarFleetSection.vue';
import BuildBrandSection from './BuildBrandSection.vue';
import LetsBeginSection from './LetsBeginSection.vue';
import ContactForm from '../ContactForm.vue';

export default {
    components: {
        SettlementsSection,
        CarFleetSection,
        BuildBrandSection,
        LetsBeginSection,
        ContactForm
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
