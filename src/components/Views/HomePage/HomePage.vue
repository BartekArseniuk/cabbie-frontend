<template>
    <main>
      <section id="welcome">
        <WelcomePageSection />
      </section>
      <section id="our-goal">
        <OurGoalSection />
      </section>
      <section id="history">
        <CabbieHistorySection />
      </section>
      <section id="offer">
        <OfferSection />
      </section>
      <section id="check-offer">
        <CheckOfferSection />
      </section>
      <section id="lets-begin">
        <LetsBeginSection :isHomePage="true" />
      </section>
      <section id="contact">
        <ContactForm :showTitle="true" />
      </section>
    </main>
  </template>
  
  <script setup>
  import WelcomePageSection from './WelcomePageSection.vue';
  import OurGoalSection from './OurGoalSection.vue';
  import CabbieHistorySection from './CabbieHistorySection.vue';
  import OfferSection from './OfferSection.vue';
  import CheckOfferSection from './CheckOfferSection.vue';
  import ContactForm from '@/components/Common/ContactForm.vue';
  import LetsBeginSection from '../../Common/LetsBeginSection.vue';
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