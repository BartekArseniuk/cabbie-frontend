<template>
<main>
    <section id="welcome">
        <WelcomePage />
    </section>
    <section id="our-goal">
        <OurGoal />
    </section>
    <section id="history">
        <h1>Cabbie history</h1>
    </section>
    <section id="offer">
        <h1>Offer</h1>
    </section>
    <section id="check-offer">
        <h1>Check Offer</h1>
    </section>
    <section id="lets-begin">
        <h1>Lets begin</h1>
    </section>
    <section id="contact">
        <h1>Contact</h1>
    </section>
</main>
</template>

<script>
import WelcomePage from './WelcomePage.vue';
import OurGoal from './OurGoal.vue';

export default {
    components: {
        WelcomePage,
        OurGoal
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