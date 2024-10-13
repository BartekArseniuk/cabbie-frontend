<template>
  <div class="offer">
    <p class="title">NASZA OFERTA</p>
    <main>
      <section id="settlements">
        <SettlementsSection />
      </section>
      <section id="second-section">
        <SecondSection />
      </section>
      <section id="cabbie-panel">
        <CabbiePanelSection />
      </section>
      <section id="car-fleet">
        <CarFleetSection />
      </section>
      <section id="gold-program"> 
        <GoldProgramSection/>
      </section>
      <section id="lets-start-cooperation">
        <LetsBeginSection />
      </section>
      <section id="contact">
        <ContactForm :showTitle="true" />
      </section>
    </main>
  </div>
</template>

<script setup>
import SettlementsSection from './SettlementsSection.vue';
import SecondSection from './SecondSection.vue';
import CabbiePanelSection from './CabbiePanelSection.vue';
import LetsBeginSection from '../../Common/LetsBeginSection.vue';
import ContactForm from '@/components/Common/ContactForm.vue';
import CarFleetSection from './CarFleetSection.vue';
import GoldProgramSection from './GoldProgramSection.vue';
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 36px;
  font-family: 'Roboto-Light', sans-serif;
  color: $primary-color;
  margin-top: 100px;
  padding: 50px 0px 50px 0px;
}

main section {
  width: 100%;
  margin: 0;
}
</style>