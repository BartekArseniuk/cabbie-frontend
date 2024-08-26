<template>
    <main>
        <section id="what-we-do-section">
            <WhatWeDoSection />
        </section>
        <section id="opinions-section">
            <OpinionsSection />
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
    import WhatWeDoSection from './WhatWeDoSection.vue';
    import OpinionsSection from './OpinionsSection.vue';
    import LetsBeginSection from '../LetsBeginSection.vue';
    import ContactForm from '../ContactForm.vue';

    export default {
        components: {
            WhatWeDoSection,
            OpinionsSection,
            LetsBeginSection,
            ContactForm
        }
    };
    </script>