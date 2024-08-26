<template>
    <main>
        <section id="what-we-do-section">
            <WhatWeDoSection />
        </section>
        <section id="opinions-section">
            <OpinionsSection />
        </section>
        <section id="start-cooperation">
            <StartCooperationSection />
        </section>
        <section id="contact">
            <ContactForm />
        </section>
    </main>
</template>
    
    <script>
    import WhatWeDoSection from './WhatWeDoSection.vue';
    import OpinionsSection from './OpinionsSection.vue';
    import StartCooperationSection from './StartCooperationSection.vue';
    import ContactForm from '../ContactForm.vue';

    export default {
        components: {
            WhatWeDoSection,
            OpinionsSection,
            StartCooperationSection,
            ContactForm
        }
    };
    </script>