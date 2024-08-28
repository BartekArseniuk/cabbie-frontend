<template>
    <main>
      <section id="news">
        <NewsSection />
      </section>
      <section id="start-cooperation">
        <LetsBeginSection :isHomePage="false" />
      </section>
    </main>
  </template>
  
  <script setup>
  import NewsSection from './NewsSection.vue';
  import LetsBeginSection from '../../Common/LetsBeginSection.vue';
  </script>  