<template>
<main>
    <section id="news">
        <NewsSection />
    </section>
    <section id="start-cooperation">
        <LetsBeginSection />
    </section>
</main>
</template>

<script>
import NewsSection from './NewsSection.vue';
import LetsBeginSection from '../HomePage/LetsBeginSection.vue';

export default {
    components: {
        NewsSection,
        LetsBeginSection
    }
};
</script>