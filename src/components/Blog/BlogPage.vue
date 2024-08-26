<template>
<main>
    <section id="news">
        <NewsSection />
    </section>
    <section id="start-cooperation">
        <LetsBeginSection />
    </section>
    <section id="contact">
        <ContactForm />
    </section>
</main>
</template>

    
<script>
import NewsSection from './NewsSection.vue';
import LetsBeginSection from '../LetsBeginSection.vue';
import ContactForm from '../ContactForm.vue';

export default {
    components: {
        NewsSection,
        LetsBeginSection,
        ContactForm
    }
};
</script>