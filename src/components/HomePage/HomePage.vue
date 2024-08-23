<template>
<main>
    <section id="welcome">
        <WelcomePage />
    </section>
    <section id="our-goal">
        <OurGoal />
    </section>
    <section id="history">
        <CabbieHistory />
    </section>
    <section id="offer">
        <OfferPage />
    </section>
    <section id="check-offer">
        <CheckOffer />
    </section>
    <section id="lets-begin">
        <LetsBegin />
    </section>
    <section id="contact">
        <h1>Contact</h1>
    </section>
</main>
</template>

<script>
import WelcomePage from './WelcomePage.vue';
import OurGoal from './OurGoal.vue';
import CabbieHistory from './CabbieHistory.vue';
import OfferPage from './OfferPage.vue';
import CheckOffer from './CheckOffer.vue';
import LetsBegin from './LetsBegin.vue';

export default {
    components: {
        WelcomePage,
        OurGoal,
        CabbieHistory,
        OfferPage,
        CheckOffer,
        LetsBegin
    }
};
</script>

<style>
main section {
    width: 100%;
    margin: 0;
}

section#welcome {
    margin-bottom: 100px;
}
</style>