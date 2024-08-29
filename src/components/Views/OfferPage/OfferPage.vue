<template>
  <div class="offer">
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
      <section id="price-list">
        <PriceListSection />
      </section>
      <section id="lets-start-cooperation">
        <LetsBeginSection :isHomePage="false" />
      </section>
      <section id="contact">
        <ContactForm :showTitle="true" />
      </section>
    </main>
  </div>
</template>

<script setup>
import SettlementsSection from './SettlementsSection.vue';
import CarFleetSection from './CarFleetSection.vue';
import BuildBrandSection from './BuildBrandSection.vue';
import LetsBeginSection from '../../Common/LetsBeginSection.vue';
import ContactForm from '@/components/Common/ContactForm.vue';
import PriceListSection from './PriceListSection.vue';
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 36px;
  font-family: 'Roboto-Light', sans-serif;
  color: $primary-color;
  margin-top: 100px;
}

main section {
  width: 100%;
  margin: 0;
}
</style>